import { deleteDesign } from "./../index";

export async function DELETE(req, res) {
  return await deleteDesign(req, res);
}
