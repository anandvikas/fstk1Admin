// import SignUp from "../components/signup/signup";
import Login from "../components/login/login";
import Dashboard from "../components/dashboard/dashboard";
import Food from "../components/food/food";
// import AddFood from "../components/food/addFood/add";
import AddFoodUseForm from "../components/food/addFood/addUseForm";
import EditFood from "../components/food/editFood/edit";
import ViewFood from "../components/food/viewFood/view";
import User from "../components/user/user";
// import AddUser from "../components/user/addUser/add";
import AddUserUseForm from "../components/user/addUser/addUseForm";
import EditUser from "../components/user/editUser/edit";
import ViewUser from "../components/user/viewUser/view";

import FormUseForm from "../components/tests/formUseForm";

import ImgUpload from "../components/img/imgUpload";

export const NonPrivateRoutes = [
  // { path: "/signup", component: SignUp },
  { path: "/", component: Login },
  { path: "/test", component: FormUseForm },
];

export const Privateroutes = [
  { path: "/", component: Dashboard },
  { path: "/food", component: Food },
  { path: "/food/add", component: AddFoodUseForm },
  { path: "/food/edit/:id", component: EditFood },
  { path: "/food/:id", component: ViewFood },
  { path: "/user", component: User },
  { path: "/user/add", component: AddUserUseForm },
  { path: "/user/edit/:id", component: EditUser },
  { path: "/user/:id", component: ViewUser },
  { path: "/test", component: FormUseForm },
  { path: "/image", component: ImgUpload },
];
