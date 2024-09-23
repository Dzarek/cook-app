"use client";

import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "@/app/firebase/clientApp";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
// import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // ARRAYS USESTATE
  const [transfers, setTransfers] = useState([]);
  const [lastAddedTransfers, setLastAddedTransfers] = useState([]);
  const [allUsersList, setAllUsersList] = useState([]);
  const [allUsersTransfers, setAllUsersTransfers] = useState([]);
  // END ARRAYS USESTATE

  // USER USESTATE
  const [userID, setUserID] = useState("0");
  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // END USER USESTATE

  // OTHER USESTATE
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalName, setModalName] = useState(false);
  const [activeHotel, setActiveHotel] = useState(null);
  const [file, setFile] = useState(null);
  const [downloadData, setDownloadData] = useState(null);

  // END OTHER USESTATE
  const router = useRouter();

  // AUTH
  const getUser = getAuth();

  const createNewUser = async (
    email: string,
    password: string,
    newName: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "usersList", getUser!.currentUser!.uid);
    await setDoc(
      userRef,
      {
        userName: newName,
        activeAccount: true,
      },
      {
        merge: true,
      }
    );
    logout();
  };

  const login = async (email: string, password: string) => {
    logout();
    await signInWithEmailAndPassword(auth, email, password);
    const getData = doc(db, `usersList/${getUser!.currentUser!.uid}`);
    const data2 = await getDoc(getData);
    if (data2.data()) {
      const item = data2.data();
      if (item!.activeAccount === false) {
        logout();
        alert("Konto zostało usunięte!");
      }
    }
    if (getUser!.currentUser!.displayName === null) {
      setModalName(true);
    }
    router.push("/");
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setName("");
    setUserID("0");
    setIsAdmin(false);
    setActiveHotel(null);
    setTransfers([]);
    setLastAddedTransfers([]);
    setAllUsersList([]);
    setAllUsersTransfers([]);
    setCurrentUser(null);
    router.push("/logowanie");
  };

  // UNSUBSCRIBE
  useEffect(async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });
    if (currentUser) {
      setUserID(currentUser.uid);
      setName(currentUser.displayName);
      const getData = doc(db, `usersList/${currentUser.uid}`);
      const data2 = await getDoc(getData);
      if (data2.data()) {
        const item = data2.data();
        if (item!.activeAccount === false) {
          logout();
          alert("Konto zostało usunięte!");
        }
      }
    }
    if (!currentUser) {
      setLoading(true);
    }
    return unsubscribe;
  }, [currentUser]);
  // END UNSUBSCRIBE

  // END AUTH

  // UPDATE USER
  const updateUser = async (newName: string) => {
    if (getUser!.currentUser!.displayName === null) {
      updateName(newName);
      changePassword();
    }
    setModalName(false);
  };

  const updateName = async (newName: string) => {
    await updateProfile(getUser!.currentUser!, {
      displayName: newName,
    });
    setName(newName);
    const userRef = doc(db, "usersList", getUser!.currentUser!.uid);
    setDoc(
      userRef,
      {
        userName: newName,
      },
      {
        merge: true,
      }
    );
  };

  const changePassword = async () => {
    await sendPasswordResetEmail(getUser, getUser.currentUser.email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  const changePasswordWhenLogin = async (email: string) => {
    await sendPasswordResetEmail(getUser, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  const disableUser = async () => {
    const userRef = doc(db, "usersList", userID);
    await setDoc(
      userRef,
      {
        activeAccount: false,
      },
      {
        merge: true,
      }
    );
  };
  // END UPDATE USER

  // FETCH FROM FIREBASE

  //   GET ALL USERS AND ALL-USERS-TRANSFERS FOR ADMIN
  const getAllUsers = async () => {
    const allUsersCollectionRef = collection(db, "usersList");
    const data = await getDocs(allUsersCollectionRef);
    let items = data.docs.filter((doc) => doc.id !== "0");
    items = items.map((doc) => ({ ...doc.data(), id: doc.id }));

    let backupArray = [];
    items = items.filter((el) => el.activeAccount === true);
    setAllUsersList(items);

    let bigItemsArray = [];
    items.map(async (el) => {
      const allUsersCollectionData = collection(
        db,
        `usersList/${el.id}/transfers`
      );
      onSnapshot(allUsersCollectionData, (snapshot) => {
        const itemsAllUsers = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const itemsArray = [];
        itemsAllUsers.map((item) => {
          itemsArray.push(item);
        });
        bigItemsArray.push(...itemsArray);
        backupArray.push({
          id: el.id,
          name: el.userName,
          itemsArray,
        });
        setDownloadData(backupArray);
        const uniqueitemsArray = [
          ...new Map(bigItemsArray.map((item) => [item["id"], item])).values(),
        ];
        setAllUsersTransfers(uniqueitemsArray);
        updateAdminHomePage(uniqueitemsArray);
      });
    });
  };

  // DOWNLOAD DATA
  const exportData = () => {
    if (isAdmin) {
      const wb = XLSX.utils.book_new();
      downloadData.map((item) => {
        const { name, itemsArray } = item;
        if (itemsArray.length > 0) {
          const sortedTransfers = itemsArray.sort((a, b) => {
            let tA = a.time; // hh:mm
            let msA =
              Number(tA.split(":")[0]) * 60 * 60 * 1000 +
              Number(tA.split(":")[1]) * 60 * 1000;
            const firstDate = new Date(a.date).getTime() + msA;
            let tB = b.time; // hh:mm
            let msB =
              Number(tB.split(":")[0]) * 60 * 60 * 1000 +
              Number(tB.split(":")[1]) * 60 * 1000;
            const secondDate = new Date(b.date).getTime() + msB;
            return firstDate - secondDate;
          });

          const newItemsArray = sortedTransfers.map((ob) => {
            const objectOrder = {
              date: null,
              time: null,
              nameOfGuest: null,
              direction: null,
              flight: null,
              people: null,
              phone: null,
              price: null,
              provision: null,
              details: null,
              status: null,
              id: null,
            };
            return Object.assign(objectOrder, ob);
          });
          const sheet1 = XLSX.utils.book_append_sheet(
            wb,
            XLSX.utils.json_to_sheet(newItemsArray),
            name
          );
        }
      });
      XLSX.writeFile(wb, "Transfery.xlsx");

      // JSON
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(downloadData)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "TransferyBackUp.json";
      link.click();
    }
  };
  // END DOWNLOAD DATA

  // DELETE DATA TO UPDATE
  const deleteData = async () => {
    file.map(async (el) => {
      allUsersTransfers.map(async (item) => {
        const productDoc = doc(db, `usersList/${el.id}/transfers`, item.id);
        await deleteDoc(productDoc);
      });
    });
    getAllUsers();
  };
  // END DELETE DATA TO UPDATE

  // UPLOAD DATA
  const uploadData = async () => {
    file.map(async (el) => {
      const userRef = doc(db, "usersList", el.id);
      await setDoc(userRef, {
        activeAccount: true,
        userName: el.name,
        money: el.money,
      });
      el.itemsArray.map(async (item) => {
        const backupCollection = doc(
          collection(db, `usersList/${el.id}/transfers`)
        );

        await setDoc(backupCollection, {
          id: item.id,
          status: item.status,
          date: item.date,
          time: item.time,
          nameOfGuest: item.nameOfGuest,
          direction: item.direction,
          people: item.people,
          details: item.details,
          flight: item.flight,
          phone: item.phone,
          price: item.price,
          provision: item.provision,
        });
      });
    });
    getAllUsers();
  };
  // END UPLOAD DATA

  useEffect(() => {
    if (currentUser && currentUser.uid === process.env.NEXT_PUBLIC_ADMIN_ID) {
      setIsAdmin(true);
      getAllUsers();
    } else {
      setIsAdmin(false);
    }
    // }, [loading, transfers]);
  }, [loading, userID]);

  //   GET ONE USER TRANSFERS
  const getProducts = async () => {
    const getProductsCollectionRefOneUser = collection(
      db,
      `usersList/${userID}/transfers`
    );
    try {
      const data = await getDocs(getProductsCollectionRefOneUser);
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      if (items.length > 0) {
        setTransfers(items);
      } else {
        setTransfers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getProducts();
    }
  }, [loading, userID]);

  // END FETCH FROM FIREBASE

  // SORT BY DATE TRANSFERS USER
  useEffect(() => {
    if (transfers.length > 0) {
      const sortedTransfers = transfers.sort((a, b) => {
        let tA = a.time; // hh:mm
        let msA =
          Number(tA.split(":")[0]) * 60 * 60 * 1000 +
          Number(tA.split(":")[1]) * 60 * 1000;
        const firstDate = new Date(a.date).getTime() + msA;
        let tB = b.time; // hh:mm
        let msB =
          Number(tB.split(":")[0]) * 60 * 60 * 1000 +
          Number(tB.split(":")[1]) * 60 * 1000;
        const secondDate = new Date(b.date).getTime() + msB;
        return firstDate - secondDate;
      });
      setTransfers(sortedTransfers);
    }
  }, [transfers]);
  //  END SORT BY DATE USER
  //  SORT BY DATE ALL USERS TRANSFERS FOR 24 HOURS FOR ADMIN
  const updateAdminHomePage = (uniqueitemsArray) => {
    if (isAdmin && uniqueitemsArray.length > 0) {
      // SORT
      const sortedTransfers = uniqueitemsArray.sort((a, b) => {
        let tA = a.time; // hh:mm
        let msA =
          Number(tA.split(":")[0]) * 60 * 60 * 1000 +
          Number(tA.split(":")[1]) * 60 * 1000;
        const firstDate = new Date(a.date).getTime() + msA;
        let tB = b.time; // hh:mm
        let msB =
          Number(tB.split(":")[0]) * 60 * 60 * 1000 +
          Number(tB.split(":")[1]) * 60 * 1000;
        const secondDate = new Date(b.date).getTime() + msB;
        return firstDate - secondDate;
      });

      // END SORT

      // NEXT TRANSFERS
      const homePagetransfers = sortedTransfers.filter((item) => {
        let t = item.time; // hh:mm
        let ms =
          Number(t.split(":")[0]) * 60 * 60 * 1000 +
          Number(t.split(":")[1]) * 60 * 1000;
        return moment(item.date).valueOf() + ms > Date.now();
      });

      const lastAdded = homePagetransfers.filter((item) => {
        return item.createdDate > moment().subtract(1, "days").valueOf();
      });
      setLastAddedTransfers(lastAdded);
      // END NEXT TRANSFERS
    }
  };

  // END  SORT BY DATE ALL USERS TRANSFERS FOR 24 HOURS FOR ADMIN

  // POST TRANSFER TO FIREBASE
  const postProducts = async (
    id,
    status,
    date,
    time,
    nameOfGuest,
    direction,
    people,
    details,
    flight,
    phone,
    price,
    provision,
    createdDate,
    specialTransfer
  ) => {
    const setDocProductsCollectionRef = doc(
      collection(db, `usersList/${userID}/transfers`)
    );
    await setDoc(setDocProductsCollectionRef, {
      id,
      status,
      date,
      time,
      nameOfGuest,
      direction,
      people,
      details,
      flight,
      phone,
      price,
      provision,
      createdDate,
      specialTransfer,
    });
    getProducts();
  };
  // END POST TRANSFER TO FIREBASE

  // EDIT STATUS
  const handleStatus = async () => {
    if (confirmDelete) {
      const deletedItem = transfers.find((item) => item.id === deleteId);
      if (isAdmin) {
        deletedItem.status = "ok";
        deletedItem.price = deletedItem.price;
        deletedItem.provision = deletedItem.provision;
        deletedItem.createdDate = moment().valueOf();
      } else {
        deletedItem.status = "cancel";
        deletedItem.price = 0;
        deletedItem.provision = 0;
        deletedItem.createdDate = moment().valueOf();
        const convertDate = moment(deletedItem.date).format("L");
        const dataNameOfGuest = deletedItem.nameOfGuest;
        const data = { name, convertDate, dataNameOfGuest };
        sendConfirmationCancel(data);
      }
      const activeTransferArray = activeTransfers.filter(
        (item) => item.id !== deleteId
      );
      setActiveTransfers(activeTransferArray);
      putEdit(
        deleteId,
        deletedItem.status,
        deletedItem.price,
        deletedItem.provision,
        deletedItem.createdDate
      );
      setConfirmDelete(false);
    }
  };

  // END EDIT STATUS

  // UPDATE TRANSFER TO FIREBASE
  const putEdit = async (editID, status, price, provision, createdDate) => {
    const productDoc = doc(db, `usersList/${userID}/transfers`, editID);
    const updatedProcuct = {
      status: status,
      price: price,
      provision: provision,
      createdDate: createdDate,
    };
    await updateDoc(productDoc, updatedProcuct);
  };
  // END UPDATE TRANSFER TO FIREBASE

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        allUsersList,
        transfers,
        name,
        currentUser,
        confirmDelete,
        modalName,
        activeHotel,
        loading,
        file,
        lastAddedTransfers,
        setTransfers,
        postProducts,
        setConfirmDelete,
        setDeleteId,
        setLoading,
        handleStatus,
        setActiveHotel,
        setName,
        setUserID,
        logout,
        login,
        updateUser,
        updateName,
        changePassword,
        changePasswordWhenLogin,
        createNewUser,
        disableUser,
        getAllUsers,
        exportData,
        uploadData,
        setFile,
        deleteData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
