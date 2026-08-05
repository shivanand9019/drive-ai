import api from "@/apis/axios";

const login = async  (loginRequest) => {
  try{
    const response = await api.post("/auth/login",loginRequest);
    const token = response.data.token;
    localStorage.setItem("token",token);
    return response.data;
  }
  catch (error){
    console.error(error);
    throw  error;
  }
}


const  register = async (registerRequest) => {

  try {
    const response = await api.post("/auth/register", registerRequest);
    return response.data;
  }catch (error){
    console.error(error);
    throw  error;
  }

}


  const logout = () => {
    localStorage.removeItem("token");

  };



export const authService = {
  login,
  register,
  logout,

};
