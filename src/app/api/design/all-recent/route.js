import { getAllRecentDesigns } from "./../index";

export async function GET(req, res) {
  return await getAllRecentDesigns(req, res);
}
