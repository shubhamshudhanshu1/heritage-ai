import { getDesignById } from "./../index";

export async function GET(req, res) {
  return await getDesignById(req, res);
}
