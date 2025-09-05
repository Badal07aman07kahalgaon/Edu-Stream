<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::with('course')
            ->where('user_id', Auth::id())
            ->get();

        $total = $cartItems->sum(function ($item) {
            return $item->course->price;
        });

        return response()->json([
            'items' => $cartItems,
            'total' => $total
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $course = Course::findOrFail($request->course_id);

        // Check if item already in cart
        $existingItem = Cart::where('user_id', Auth::id())
            ->where('course_id', $request->course_id)
            ->first();

        if ($existingItem) {
            return response()->json([
                'message' => 'Course already in cart'
            ], 400);
        }

        $cartItem = Cart::create([
            'user_id' => Auth::id(),
            'course_id' => $request->course_id,
        ]);

        return response()->json([
            'item' => $cartItem->load('course'),
            'message' => 'Course added to cart'
        ], 201);
    }

    public function remove($id)
    {
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $cartItem->delete();

        return response()->json([
            'message' => 'Item removed from cart'
        ]);
    }

    public function checkout(Request $request)
    {
        $cartItems = Cart::with('course')
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty'
            ], 400);
        }

        $total = $cartItems->sum(function ($item) {
            return $item->course->price;
        });

        // Here you would typically integrate with a payment gateway
        // For now, we'll just clear the cart and create enrollments

        foreach ($cartItems as $item) {
            \App\Models\Enrollment::create([
                'user_id' => Auth::id(),
                'course_id' => $item->course_id,
                'enrolled_at' => now(),
            ]);
        }

        Cart::where('user_id', Auth::id())->delete();

        return response()->json([
            'message' => 'Checkout successful',
            'total' => $total
        ]);
    }
}
