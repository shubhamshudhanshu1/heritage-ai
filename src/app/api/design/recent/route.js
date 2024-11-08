import { getRecentDesigns } from "./../index";

export async function GET(req, res) {
  return await getRecentDesigns(req, res);
}
