import { NextResponse } from "next/server";
import Config from "@/models/Config";
import { connectToDatabase } from "@/helper/db";

// const connectToDatabase = async () => {
//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   }
// };

export async function GET(request, { params }) {
  await connectToDatabase();
  const { tenant } = params;
  try {
    const configs = await Config.find({ tenant });
    return NextResponse.json(configs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
