// File service — backend integration placeholders.
// Upload and download are wired to backend where available.
// Other file operations remain TODO until backend routes are implemented.

import api from "@/apis/axios.jsx";

export async function getFiles() {
  // Backend list files endpoint is not implemented yet.
  const response = await api.get("/files");

  return response.data;
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function downloadFile(fileId) {
  try {
    const response = await api.get(`/files/download/${fileId}`, { responseType: "blob" });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function renameFile(fileId, fileName) {
 try{
   const response = await api.patch(`/files/rename/${fileId}`,
       {fileName,});
   return response.data;
 }catch (error){
   console.error(error);
   throw  error;
 }
}

export async function deleteFile(fileId) {
  try{
    await  api.delete(`/files/delete/${fileId}`);
  } catch (error){
    console.error(error);
    throw  error;
  }
}

export async  function getTrashFiles(pages=0, size=20){
  try{
    const response = await api.get("/files/trash",{
      params:{
        pages,size
      },

    });
    return response.data;
  } catch (error){
    console.error(error);
    throw  error;
  }
}

export async  function restoreFile(fileId){
  try{
    await api.patch(`/files/restore/${fileId}`);

  }catch (error){
    console.error(error);
    throw error;
  }
}


export async  function searchFiles(searchText,pages=0, size=20){
  try{
    const response = await api.get("/files/search",{
      params:{
        searchText,pages,size
      },

    });
    return response.data;
  } catch (error){
    console.error(error);
    throw  error;
  }
}

export async  function deletePermanently(fileId){
  try{
    await api.delete(`/files/delete/${fileId}/permanent`)

  }catch (error){
    console.error(error);
    throw error;
  }
}
export async function shareFile(fileId, email) {
  // Backend share endpoint is not implemented yet.
  await new Promise((r) => setTimeout(r, 300));
  return { ok: true, url: `https://driveai.app/s/${fileId}` };
}

export async function analyzeFile(fileId) {
  // Backend analyze endpoint is not implemented yet.
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true };
}

export const MOCK_FILES = [
  { id: 'f1', name: 'Q3 Financial Report.pdf', size: 2_415_232, type: 'pdf', uploadedAt: '2026-07-28', status: 'Ready', aiStatus: 'Summarized', owner: 'You' },
  { id: 'f2', name: 'Product Roadmap 2026.docx', size: 845_000, type: 'docx', uploadedAt: '2026-07-26', status: 'Ready', aiStatus: 'Indexed', owner: 'You' },
  { id: 'f3', name: 'Team Offsite Photos.zip', size: 58_120_000, type: 'zip', uploadedAt: '2026-07-22', status: 'Ready', aiStatus: 'Processing', owner: 'You' },
  { id: 'f4', name: 'Customer Survey Results.xlsx', size: 1_204_000, type: 'xlsx', uploadedAt: '2026-07-20', status: 'Ready', aiStatus: 'Classified', owner: 'You' },
  { id: 'f5', name: 'Brand Assets Final.png', size: 8_940_000, type: 'png', uploadedAt: '2026-07-18', status: 'Ready', aiStatus: 'Tagged', owner: 'You' },
  { id: 'f6', name: 'Investor Pitch Deck.pptx', size: 14_200_000, type: 'pptx', uploadedAt: '2026-07-15', status: 'Ready', aiStatus: 'Summarized', owner: 'You' },
  { id: 'f7', name: 'Onboarding Walkthrough.mp4', size: 124_500_000, type: 'mp4', uploadedAt: '2026-07-12', status: 'Processing', aiStatus: 'Pending', owner: 'You' },
  { id: 'f8', name: 'API Contract v2.json', size: 92_000, type: 'json', uploadedAt: '2026-07-08', status: 'Ready', aiStatus: 'Indexed', owner: 'You' },
];

export const fileService = {
  getFiles,
  uploadFile,
  downloadFile,
  renameFile,
  deleteFile,
  getTrashFiles,
  restoreFile,
  searchFiles,
  deletePermanently,
  shareFile,
  analyzeFile,
};
