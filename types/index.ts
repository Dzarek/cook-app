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

type RecipeTypeList = {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  author: {
    authorName: string;
    authorAvatar: string;
  };
  category: string[];
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
  activeUser: any;
  name: string;
  isLogin: boolean;
  loading: boolean;
  email: string;
  avatar: string;
  modalName: boolean;
  editRecipe: any;
  setEditRecipe: (editRecipe: any) => void;
  setIsLogin: (isLogin: boolean) => void;
  setName: (name: string) => void;
  setModalName: (modalName: boolean) => void;
  setAvatar: (avatar: string) => void;
  setLoading: (loading: boolean) => void;
};

type CloudinaryContextTypes = {
  loaded: boolean;
};
