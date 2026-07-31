import dbConnect from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await dbConnect();

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    const archivedProduct = await Product.findByIdAndUpdate(
      params.id,
      { archived: !product?.archived },
      { new: true },
    ).populate("category");

    return NextResponse.json({
      success: true,
      message: product.archived ? "Product restored" : "Product archived",
      data: archivedProduct,
    });
  } catch (error) {
    console.error("PATCH /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
};
