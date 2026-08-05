// User profile & preferences service — backend integration placeholders.

import api from "../apis/axios"

const getCurrentUser = async ()=>{
  try{
    const response = await  api.get("/users/me");
    return response.data;
  }catch (error){
    console.error(error);
    throw error;
  }
}
// TODO: Update user profile
export async function updateProfile(payload) {
  // TODO: PATCH /api/users/me
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}

// TODO: Update notification preferences
export async function updatePreferences(payload) {
  // TODO: PATCH /api/users/me/preferences
  await new Promise((r) => setTimeout(r, 400));
  return { ok: true };
}


export const userService = {
  getCurrentUser,updateProfile,updatePreferences
};