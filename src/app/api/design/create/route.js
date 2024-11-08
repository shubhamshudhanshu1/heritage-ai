import { createDesign } from "./../index";

export async function POST(req, res) {
  return await createDesign(req, res);
}
