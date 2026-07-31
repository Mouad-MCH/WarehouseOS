import dbConnect from "@/lib/db";
import { productSchema } from "@/lib/validations/product";
import { authOptions } from "@/lib/auth";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
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
          message: "Validation error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, sku, description, category, price, quantity } = result.data;

    await dbConnect();

    const existingProduct = await Product.findOne({ sku });

    if (existingProduct) {
      return NextResponse.json(
        { success: false, message: "SKU already exists" },
        { status: 409 },
      );
    }

    const categoryExists = await Category.findOne({ _id: category });

    if (!categoryExists) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 },
      );
    }

    const newProduct = await Product.create({
      name,
      sku,
      description,
      category,
      price,
      quantity,
    });

    await newProduct?.populate("category");

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: newProduct,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const archived = searchParams.get('archived') === 'true';

    

    await dbConnect();

    const products = await Product.find({ archived })
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
};
