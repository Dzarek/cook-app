type Recipe = {
  id: string;
  createdTime: number;
  author: {
    authorName: string;
    authorAvatar: string;
  };
  title: string;
  slug: string;
  image: string;
  prepTime: number;
  cookTime: number;
  portion: number;
  category: string[];
  shortInfo: string;
  ingredients: string[];
  steps: string[];
  description?: string;
  likes: number;
};

type User = {
  userName: string;
  activeUser: boolean;
  avatar: string;
  id: string;
};

type BackupData = {};

type ContextTypes = {
  isAdmin: boolean;
  allUsersList: User[];
  recipes: Recipe[];
  // name: string;
  // currentUser: any;
  // confirmDelete: boolean;
  // modalName: boolean;
  // activeUser: any;
  // loading: boolean;
  // file: any;
  // lastAddedRecipes: Transfer[];
  // setRecipes: (recipes: Transfer[]) => void;
  // postProducts: (data: Transfer) => void;
  // setConfirmDelete: (confirmDelete: boolean) => void;
  // setDeleteId: (deleteId: string | null) => void;
  // setLoading: (loading: boolean) => void;
  // handleStatus: () => void;
  // setActiveUser: (activeUser: any) => void;
  // setName: (name: string) => void;
  // setUserId: (userId: string) => void;
  // logout: () => void;
  // login: (email: string, password: string) => void;
  // updateUser: (newName: string) => void;
  // updateName: (newName: string) => void;
  // changePassword: () => void;
  // changePasswordWhenLogin: (email: string) => void;
  // createNewUser: (email: string, password: string, newName: string) => void;
  // disableUser: () => void;
  // getAllUsers: () => void;
  // uploadData: () => void;
  // setFile: (file: any) => void;
  // deleteData: () => void;
};
