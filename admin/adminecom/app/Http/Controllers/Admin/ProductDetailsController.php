<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductDetails;
use App\Models\ProductList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class ProductDetailsController extends Controller
{
    public function ProductDetails(Request $request)
    {

        // try {
        //     $id = decrypt($request->id);
        // } catch (DecryptException $e) {
        //     //
        // }
        $id = $request->id;
        $productDetails = ProductDetails::where('product_id', $id)->get();
        $productList = ProductList::where('id', $id)->get();

        $item = [
            'productDetails' => $productDetails,
            'productList' => $productList,
        ];
        return $item;
    }
}
