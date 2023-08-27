<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductList;
use App\Models\ProductReview;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function ReviewList(Request $request)
    {
        $product_code = $request->product_code;
        $result = ProductReview::where('product_code', $product_code)->orderBy('id', 'desc')->limit(4)->get();
        return $result;
    } // End Method
    public function PostReview(Request $request)
    {

        $product_name = $request->input('product_name');

        $product = ProductList::where('title', 'like', '%' . $product_name . '%')->first();
        $product_id = $product->id;
        $product_code = $product->product_code;
        $user_name = $request->input('reviewer_name');
        $reviewer_photo = $request->input('reviewer_photo');
        $reviewer_rating = $request->input('reviewer_rating');
        $reviewer_comments = $request->input('reviewer_comments');

        $result = ProductReview::insert([
            'product_name' => $product_name,
            'product_id' => $product_id,
            'reviewer_name' => $user_name,
            'product_code' => $product_code,
            // 'reviewer_photo' => $reviewer_photo,
            'reviewer_rating' => $reviewer_rating,
            'reviewer_comments' => $reviewer_comments,
        ]);
        // $result = $result ? 1 : 0;
        // return response([
        //     'result' => $result,
        //     'product_code' => $product_code
        // ], 200); // States Code
        // return
        //     [$result, $product_code];
        return $result;
    } // End Method
    public function GetAllReview()
    {

        $review = ProductReview::latest()->get();
        return view('backend.review.review_all', compact('review'));
    } // End Method
}
