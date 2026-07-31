import dbConnect from "@/lib/db";
import { productSchema } from "@/lib/validations/product";
import { authOptions } from "@/lib/auth";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
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

    const product = await Product.findById(params.id).populate("category");

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "product not Found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("GET api/products/[id] error", error);
    return NextResponse.json(
      {
        success: false,
        message: "server error",
      },
      { status: 500 },
    );
  }
};

export const PUT = async (
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

    const body = await request.json();

    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, sku, description, category, price, quantity } = result.data;

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

    if (sku !== product.sku) {
      const skuExist = await Product.findOne({ sku });
      if (skuExist) {
        return NextResponse.json(
          {
            success: false,
            message: "Sku is alredy Exists",
          },
          { status: 409 },
        );
      }
    }

    const categoryExists = await Category.findOne({ _id: category });
    if (!categoryExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not Found",
        },
        { status: 404 },
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      { name, sku, description, category, price, quantity },
      { new: true },
    ).populate("category");

    return NextResponse.json({
      success: true,
      message: "Product update successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
};
