import { updateDesign } from "./../index";

export async function PUT(req, res) {
  return await updateDesign(req, res);
}
