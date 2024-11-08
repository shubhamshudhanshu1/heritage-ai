// Import necessary libraries
import connectToDatabase from "@/helper/db";
import Design from "@/models/Design";

// 1. Create Design API
export async function createDesign(req, res) {
  const { userId, title, description, tags, previewImages } = req.body;

  try {
    await connectToDatabase();
    const newDesign = await Design.create({
      userId,
      title,
      description,
      tags,
      previewImages,
      lastAccessedAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Design created successfully", data: newDesign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// 2. Update Design API
export async function updateDesign(req, res) {
  const { designId } = req.query;
  const updateFields = req.body;

  try {
    await connectToDatabase();
    const updatedDesign = await Design.findByIdAndUpdate(
      designId,
      { ...updateFields, lastAccessedAt: new Date() },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Design updated successfully", data: updatedDesign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// 3. Delete Design API
export async function deleteDesign(req, res) {
  const { designId } = req.query;

  try {
    await connectToDatabase();
    await Design.findByIdAndDelete(designId);
    res.status(200).json({ message: "Design deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// 4. Get Designs by User ID API
export async function getDesignsByUserId(req, res) {
  const { userId } = req.query;

  try {
    await connectToDatabase();
    const designs = await Design.find({ userId }).sort({ lastAccessedAt: -1 });
    res.status(200).json({ data: designs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// 5. Get Design by ID API
export async function getDesignById(req, res) {
  const { designId } = req.query;

  try {
    await connectToDatabase();
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }
    // Update lastAccessedAt field
    design.lastAccessedAt = new Date();
    await design.save();
    res.status(200).json({ data: design });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// 6. Get Recent Designs by User ID API
export async function getRecentDesigns(req, res) {
  const { userId } = req.query;

  try {
    await connectToDatabase();
    const recentDesigns = await Design.find({ userId })
      .sort({ lastAccessedAt: -1 })
      .limit(5);
    res.status(200).json({ data: recentDesigns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// 7. Get All Recent Designs API
export async function getAllRecentDesigns(req, res) {
  try {
    await connectToDatabase();
    const recentDesigns = await Design.find()
      .sort({ lastAccessedAt: -1 })
      .limit(5);
    res.status(200).json({ data: recentDesigns });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
