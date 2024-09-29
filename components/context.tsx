"use client";

import { useState, useEffect, useContext, createContext } from "react";
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
import * as XLSX from "xlsx";
import moment from "moment/min/moment-with-locales";
import { useRouter } from "next/navigation";

moment.locale("pl");

const defaultValues: ContextTypes = {
  isAdmin: false,
  allUsersList: [],
  recipes: [],
  // name: "",
  // currentUser: null,
  // confirmDelete: false,
  // modalName: false,
  // activeUser: null,
  // loading: false,
  // file: null,
  // lastAddedRecipes: [],
  // setRecipes: () => {},
  // postProducts: () => {},
  // setConfirmDelete: () => {},
  // setDeleteId: () => {},
  // setLoading: () => {},
  // handleStatus: () => {},
  // setActiveUser: () => {},
  // setName: () => {},
  // setUserId: () => {},
  // logout: () => {},
  // login: () => {},
  // updateUser: () => {},
  // updateName: () => {},
  // changePassword: () => {},
  // changePasswordWhenLogin: () => {},
  // createNewUser: () => {},
  // disableUser: () => {},
  // getAllUsers: () => {},
  // uploadData: () => {},
  // setFile: () => {},
  // deleteData: () => {},
};

const AppContext = createContext<ContextTypes>(defaultValues);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // ARRAYS USESTATE
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastAddedRecipes, setLastAddedRecipes] = useState<Recipe[]>([]);
  const [allUsersList, setAllUsersList] = useState<User[]>([]);
  const [allUsersRecipes, setAllUsersRecipes] = useState<Recipe[]>([]);
  // END ARRAYS USESTATE

  // USER USESTATE
  const [userID, setUserID] = useState("0");
  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // END USER USESTATE

  // OTHER USESTATE
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalName, setModalName] = useState(false);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [downloadData, setDownloadData] = useState<BackupData>([]);

  // END OTHER USESTATE
  const router = useRouter();

  // AUTH
  const getUser = getAuth();

  // const createNewUser = async (
  //   email: string,
  //   password: string,
  //   newName: string
  // ) => {
  //   await createUserWithEmailAndPassword(auth, email, password);
  //   const userRef = doc(db, "usersList", getUser.currentUser!.uid);
  //   await setDoc(
  //     userRef,
  //     {
  //       userName: newName,
  //       activeAccount: true,
  //     },
  //     {
  //       merge: true,
  //     }
  //   );
  //   logout();
  // };

  // const login = async (email: string, password: string) => {
  //   logout();
  //   await signInWithEmailAndPassword(auth, email, password);
  //   const getData = doc(db, `usersList/${getUser.currentUser!.uid}`);
  //   const data2 = await getDoc(getData);
  //   if (data2.data()) {
  //     const item = data2.data();
  //     if (item!.activeAccount === false) {
  //       logout();
  //       alert("Konto zostało usunięte!");
  //     }
  //   }
  //   if (getUser!.currentUser!.displayName === null) {
  //     setModalName(true);
  //   }
  //   router.push("/");
  // };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setName("");
    setUserID("0");
    setIsAdmin(false);
    setActiveUser(null);
    setRecipes([]);
    setLastAddedRecipes([]);
    setAllUsersList([]);
    setAllUsersRecipes([]);
    setCurrentUser(null);
    router.push("/logowanie");
  };

  // UNSUBSCRIBE
  useEffect(() => {
    const authStateChanged = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        console.log(currentUser);
      });
      if (currentUser) {
        setUserID(currentUser.uid);
        setName(currentUser.displayName);
        const getData = doc(db, `usersList/${currentUser.uid}`);
        const data2 = await getDoc(getData);
        if (data2.data()) {
          const item = data2.data();
          if (item!.activeAccount === false) {
            // logout();
            alert("Konto zostało usunięte!");
          }
        }
      }
      if (!currentUser) {
        setLoading(true);
      }
      return unsubscribe;
    };
    authStateChanged();
  }, [currentUser]);
  // END UNSUBSCRIBE

  // END AUTH

  // UPDATE USER
  // const updateUser = async (newName: string) => {
  //   if (getUser.currentUser!.displayName === null) {
  //     updateName(newName);
  //     changePassword();
  //   }
  //   setModalName(false);
  // };

  // const updateName = async (newName: string) => {
  //   await updateProfile(getUser.currentUser!, {
  //     displayName: newName,
  //   });
  //   setName(newName);
  //   const userRef = doc(db, "usersList", getUser.currentUser!.uid);
  //   setDoc(
  //     userRef,
  //     {
  //       userName: newName,
  //     },
  //     {
  //       merge: true,
  //     }
  //   );
  // };

  // const changePassword = async () => {
  //   await sendPasswordResetEmail(getUser, getUser.currentUser.email)
  //     .then(() => {
  //       // Password reset email sent!
  //       // ..
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
  // };
  // const changePasswordWhenLogin = async (email: string) => {
  //   await sendPasswordResetEmail(getUser, email)
  //     .then(() => {
  //       // Password reset email sent!
  //       // ..
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
  // };
  // const disableUser = async () => {
  //   const userRef = doc(db, "usersList", userID);
  //   await setDoc(
  //     userRef,
  //     {
  //       activeAccount: false,
  //     },
  //     {
  //       merge: true,
  //     }
  //   );
  // };
  // END UPDATE USER

  // FETCH FROM FIREBASE
  // const getRecipes = async (userID: string) => {
  //   const getProductsCollectionRefOneUser = collection(
  //     db,
  //     `usersList/${userID}/recipes`
  //   );
  //   try {
  //     const data = await getDocs(getProductsCollectionRefOneUser);
  //     const items = data.docs.map((doc) => {
  //       const recipeData = doc.data();
  //       const recipe: Recipe = {
  //         id: doc.id,
  //         title: recipeData.title,
  //         slug: recipeData.slug,
  //         image: recipeData.image,
  //         prepTime: recipeData.prepTime,
  //         cookTime: recipeData.cookTime,
  //         portion: recipeData.portion,
  //         category: recipeData.category,
  //         shortInfo: recipeData.shortInfo,
  //         ingredients: recipeData.ingredients,
  //         steps: recipeData.steps,
  //         description: recipeData.description || "",
  //         likes: recipeData.likes,
  //       };

  //       return recipe;
  //     });
  //     setRecipes(items);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //   GET ALL USERS AND ALL-USERS-TRANSFERS FOR ADMIN
  // const getAllUsers = async () => {
  //   const allUsersCollectionRef = collection(db, "usersList");
  //   try {
  //     const data = await getDocs(allUsersCollectionRef);
  //     let items = data.docs
  //       .filter((doc) => doc.id !== "0")
  //       .map((doc) => ({ id: doc.id, ...(doc.data() as User) }));

  //     items = items.filter((el) => el.activeUser === true);
  //     setAllUsersList(items);
  //     let backupArray = [];
  //     let bigItemsArray: Recipe[] = [];
  //     items.map(async (el) => {
  //       const allUsersCollectionData = collection(
  //         db,
  //         `usersList/${el.id}/recipes`
  //       );
  //       const data = await getDocs(allUsersCollectionData);
  //       const itemsAllUsers = data.docs.map((doc) => {
  //         const recipeData = doc.data();
  //         const recipe: Recipe = {
  //           id: doc.id,
  //           title: recipeData.title,
  //           slug: recipeData.slug,
  //           image: recipeData.image,
  //           prepTime: recipeData.prepTime,
  //           cookTime: recipeData.cookTime,
  //           portion: recipeData.portion,
  //           category: recipeData.category,
  //           shortInfo: recipeData.shortInfo,
  //           ingredients: recipeData.ingredients,
  //           steps: recipeData.steps,
  //           description: recipeData.description || "",
  //           likes: recipeData.likes,
  //         };

  //         return recipe;
  //       });
  //       const itemsArray: any[] = [];
  //       itemsAllUsers.map((item) => {
  //         itemsArray.push(item);
  //       });

  //       bigItemsArray.push(...itemsArray);
  //       console.log(bigItemsArray);
  //       backupArray.push({
  //         id: el.id,
  //         name: el.userName,
  //         itemsArray,
  //       });
  //       setDownloadData(backupArray);
  //       // const uniqueitemsArray = [
  //       //   ...new Map(bigItemsArray.map((item) => [item["id"], item])).values(),
  //       // ];
  //       setAllUsersRecipes(bigItemsArray);
  //       //     // updateAdminHomePage(uniqueitemsArray);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getAllUsers();
  // }, []);
  // DOWNLOAD DATA
  // const exportData = () => {
  //   if (isAdmin) {
  //     const wb = XLSX.utils.book_new();
  //     downloadData.map((item) => {
  //       const { name, itemsArray } = item;
  //       if (itemsArray.length > 0) {
  //         const sortedTransfers = itemsArray.sort((a, b) => {
  //           let tA = a.time; // hh:mm
  //           let msA =
  //             Number(tA.split(":")[0]) * 60 * 60 * 1000 +
  //             Number(tA.split(":")[1]) * 60 * 1000;
  //           const firstDate = new Date(a.date).getTime() + msA;
  //           let tB = b.time; // hh:mm
  //           let msB =
  //             Number(tB.split(":")[0]) * 60 * 60 * 1000 +
  //             Number(tB.split(":")[1]) * 60 * 1000;
  //           const secondDate = new Date(b.date).getTime() + msB;
  //           return firstDate - secondDate;
  //         });

  //         const newItemsArray = sortedTransfers.map((ob) => {
  //           const objectOrder = {
  //             date: null,
  //             time: null,
  //             nameOfGuest: null,
  //             direction: null,
  //             flight: null,
  //             people: null,
  //             phone: null,
  //             price: null,
  //             provision: null,
  //             details: null,
  //             status: null,
  //             id: null,
  //           };
  //           return Object.assign(objectOrder, ob);
  //         });
  //         const sheet1 = XLSX.utils.book_append_sheet(
  //           wb,
  //           XLSX.utils.json_to_sheet(newItemsArray),
  //           name
  //         );
  //       }
  //     });
  //     XLSX.writeFile(wb, "Transfery.xlsx");

  //     // JSON
  //     const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
  //       JSON.stringify(downloadData)
  //     )}`;
  //     const link = document.createElement("a");
  //     link.href = jsonString;
  //     link.download = "TransferyBackUp.json";
  //     link.click();
  //   }
  // };
  // END DOWNLOAD DATA

  // DELETE DATA TO UPDATE
  // const deleteData = async () => {
  //   file.map(async (el) => {
  //     allUsersTransfers.map(async (item) => {
  //       const productDoc = doc(db, `usersList/${el.id}/transfers`, item.id);
  //       await deleteDoc(productDoc);
  //     });
  //   });
  //   getAllUsers();
  // };
  // END DELETE DATA TO UPDATE

  // UPLOAD DATA
  // const uploadData = async () => {
  //   file.map(async (el) => {
  //     const userRef = doc(db, "usersList", el.id);
  //     await setDoc(userRef, {
  //       activeAccount: true,
  //       userName: el.name,
  //       money: el.money,
  //     });
  //     el.itemsArray.map(async (item) => {
  //       const backupCollection = doc(
  //         collection(db, `usersList/${el.id}/transfers`)
  //       );

  //       await setDoc(backupCollection, {
  //         id: item.id,
  //         status: item.status,
  //         date: item.date,
  //         time: item.time,
  //         nameOfGuest: item.nameOfGuest,
  //         direction: item.direction,
  //         people: item.people,
  //         details: item.details,
  //         flight: item.flight,
  //         phone: item.phone,
  //         price: item.price,
  //         provision: item.provision,
  //       });
  //     });
  //   });
  //   getAllUsers();
  // };
  // END UPLOAD DATA

  // useEffect(() => {
  //   if (currentUser) {
  //     getAllUsers();
  //   }
  // }, [loading, userID]);

  // useEffect(() => {
  //   if (currentUser && currentUser.uid === process.env.NEXT_PUBLIC_ADMIN_ID) {
  //     setIsAdmin(true);
  //     getAllUsers();
  //   } else {
  //     setIsAdmin(false);
  //   }
  // }, [loading, userID]);

  //   GET ONE USER TRANSFERS
  // const getRecipes = async (userID: string) => {
  //   const getProductsCollectionRefOneUser = collection(
  //     db,
  //     `usersList/${userID}/recipes`
  //   );
  //   try {
  //     const data = await getDocs(getProductsCollectionRefOneUser);
  //     const items = data.docs.map((doc) => {
  //       const recipeData = doc.data();
  //       const recipe: Recipe = {
  //         id: doc.id,
  //         title: recipeData.title,
  //         slug: recipeData.slug,
  //         image: recipeData.image,
  //         prepTime: recipeData.prepTime,
  //         cookTime: recipeData.cookTime,
  //         portion: recipeData.portion,
  //         category: recipeData.category,
  //         shortInfo: recipeData.shortInfo,
  //         ingredients: recipeData.ingredients,
  //         steps: recipeData.steps,
  //         description: recipeData.description || "",
  //         likes: recipeData.likes,
  //       };

  //       return recipe;
  //     });
  //     setRecipes(items);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser) {
  //     getRecipes(userID);
  //   }
  // }, [loading, userID]);

  // END FETCH FROM FIREBASE

  // SORT BY DATE TRANSFERS USER
  // useEffect(() => {
  //   if (recipes.length > 0) {
  //     const sortedTransfers = recipes.sort((a, b) => {
  //       let tA = a.time; // hh:mm
  //       let msA =
  //         Number(tA.split(":")[0]) * 60 * 60 * 1000 +
  //         Number(tA.split(":")[1]) * 60 * 1000;
  //       const firstDate = new Date(a.date).getTime() + msA;
  //       let tB = b.time; // hh:mm
  //       let msB =
  //         Number(tB.split(":")[0]) * 60 * 60 * 1000 +
  //         Number(tB.split(":")[1]) * 60 * 1000;
  //       const secondDate = new Date(b.date).getTime() + msB;
  //       return firstDate - secondDate;
  //     });
  //     setRecipes(sortedTransfers);
  //   }
  // }, [recipes]);
  // //  END SORT BY DATE USER
  // //  SORT BY DATE ALL USERS TRANSFERS FOR 24 HOURS FOR ADMIN
  // const updateAdminHomePage = (uniqueitemsArray) => {
  //   if (isAdmin && uniqueitemsArray.length > 0) {
  //     // SORT
  //     const sortedTransfers = uniqueitemsArray.sort((a, b) => {
  //       let tA = a.time; // hh:mm
  //       let msA =
  //         Number(tA.split(":")[0]) * 60 * 60 * 1000 +
  //         Number(tA.split(":")[1]) * 60 * 1000;
  //       const firstDate = new Date(a.date).getTime() + msA;
  //       let tB = b.time; // hh:mm
  //       let msB =
  //         Number(tB.split(":")[0]) * 60 * 60 * 1000 +
  //         Number(tB.split(":")[1]) * 60 * 1000;
  //       const secondDate = new Date(b.date).getTime() + msB;
  //       return firstDate - secondDate;
  //     });

  //     // END SORT

  //     // NEXT TRANSFERS
  //     const homePagetransfers = sortedTransfers.filter((item) => {
  //       let t = item.time; // hh:mm
  //       let ms =
  //         Number(t.split(":")[0]) * 60 * 60 * 1000 +
  //         Number(t.split(":")[1]) * 60 * 1000;
  //       return moment(item.date).valueOf() + ms > Date.now();
  //     });

  //     const lastAdded = homePagetransfers.filter((item) => {
  //       return item.createdDate > moment().subtract(1, "days").valueOf();
  //     });
  //     setLastAddedRecipes(lastAdded);
  //     // END NEXT TRANSFERS
  //   }
  // };

  // END  SORT BY DATE ALL USERS TRANSFERS FOR 24 HOURS FOR ADMIN

  // POST TRANSFER TO FIREBASE
  // const postProducts = async (
  //   id,
  //   status,
  //   date,
  //   time,
  //   nameOfGuest,
  //   direction,
  //   people,
  //   details,
  //   flight,
  //   phone,
  //   price,
  //   provision,
  //   createdDate,
  //   specialTransfer
  // ) => {
  //   const setDocProductsCollectionRef = doc(
  //     collection(db, `usersList/${userID}/transfers`)
  //   );
  //   await setDoc(setDocProductsCollectionRef, {
  //     id,
  //     status,
  //     date,
  //     time,
  //     nameOfGuest,
  //     direction,
  //     people,
  //     details,
  //     flight,
  //     phone,
  //     price,
  //     provision,
  //     createdDate,
  //     specialTransfer,
  //   });
  //   getProducts();
  // };
  // END POST TRANSFER TO FIREBASE

  // EDIT STATUS
  // const handleStatus = async () => {
  //   if (confirmDelete) {
  //     const deletedItem = recipes.find((item) => item.id === deleteId);
  //     if (isAdmin) {
  //       deletedItem.status = "ok";
  //       deletedItem.price = deletedItem.price;
  //       deletedItem.provision = deletedItem.provision;
  //       deletedItem.createdDate = moment().valueOf();
  //     } else {
  //       deletedItem.status = "cancel";
  //       deletedItem.price = 0;
  //       deletedItem.provision = 0;
  //       deletedItem.createdDate = moment().valueOf();
  //       const convertDate = moment(deletedItem.date).format("L");
  //       const dataNameOfGuest = deletedItem.nameOfGuest;
  //       const data = { name, convertDate, dataNameOfGuest };
  //       sendConfirmationCancel(data);
  //     }
  //     const activeTransferArray = activeTransfers.filter(
  //       (item) => item.id !== deleteId
  //     );
  //     setActiveRecipes(activeTransferArray);
  //     putEdit(
  //       deleteId,
  //       deletedItem.status,
  //       deletedItem.price,
  //       deletedItem.provision,
  //       deletedItem.createdDate
  //     );
  //     setConfirmDelete(false);
  //   }
  // };

  // END EDIT STATUS

  // UPDATE TRANSFER TO FIREBASE
  // const putEdit = async (editID, status, price, provision, createdDate) => {
  //   const productDoc = doc(db, `usersList/${userID}/transfers`, editID);
  //   const updatedProcuct = {
  //     status: status,
  //     price: price,
  //     provision: provision,
  //     createdDate: createdDate,
  //   };
  //   await updateDoc(productDoc, updatedProcuct);
  // };
  // END UPDATE TRANSFER TO FIREBASE

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        allUsersList,
        recipes,
        // name,
        // currentUser,
        // confirmDelete,
        // modalName,
        // activeUser,
        // loading,
        // file,
        // lastAddedRecipes,
        // setRecipes,
        // postProducts,
        // setConfirmDelete,
        // setDeleteId,
        // setLoading,
        // handleStatus,
        // setActiveUser,
        // setName,
        // setUserID,
        // logout,
        // login,
        // updateUser,
        // updateName,
        // changePassword,
        // changePasswordWhenLogin,
        // createNewUser,
        // disableUser,
        // getAllUsers,
        // exportData,
        // uploadData,
        // setFile,
        // deleteData,
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
