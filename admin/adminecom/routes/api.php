<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ProductDetailsController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\SiteInfoController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\FavouriteController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgetController;
use App\Http\Controllers\ResetController;

use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Login Routes
Route::post('/login', [AuthController::class, 'Login']);

// Register Routes
Route::post('/register', [AuthController::class, 'Register']);

// Forget Password Routes
Route::post('/forgetpassword', [ForgetController::class, 'ForgetPassword']);

// Reset Password Routes
Route::post('/resetpassword', [ResetController::class, 'ResetPassword']);

// Current User Route
// Route::group(['middleware' => 'auth'], function () {  //this auth is laravel default auth
//     Route::get('/user', [UserController::class, 'User']);
// });
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', [UserController::class, 'User']);
// });
// Route::get('/user', [UserController::class, 'User'])->middleware('auth:sanctum');

Route::get('/user', [UserController::class, 'User'])->middleware('auth:sanctum');
// Route::get('/logout', [AuthController::class, 'logout']);


Route::get('/similar/{subcategory}/{product_code}', [ProductListController::class, 'SimilarProduct']);


// Review Product Route
Route::get('/reviewlist/{product_code}', [ReviewController::class, 'ReviewList']);


Route::post('/addtocart', [ProductCartController::class, 'addToCart']);
Route::get('/cartcount/{email}', [ProductCartController::class, 'CartCount']);
Route::get('/favourite/{product_code}/{email}', [FavouriteController::class, 'AddFavourite']);
Route::get('/favouritelist/{email}', [FavouriteController::class, 'FavouriteList']);

Route::get('/favouriteremove/{product_code}/{email}', [FavouriteController::class, 'FavouriteRemove']);
Route::get('/cartlist/{email}', [ProductCartController::class, 'CartList']);
Route::get('/removecartlist/{id}', [ProductCartController::class, 'RemoveCartList']);
Route::get('/cartitemplus/{id}/{quantity}/{price}', [ProductCartController::class, 'CartItemPlus']);

Route::get('/cartitemminus/{id}/{quantity}/{price}', [ProductCartController::class, 'CartItemMinus']);

Route::post('/cartorder', [ProductCartController::class, 'CartOrder']);
Route::get('/orderlistbyuser/{email}', [ProductCartController::class, 'OrderListByUser']);

// Post Product Review Route
Route::post('/postreview', [ReviewController::class, 'PostReview']);

Route::get('/getvisitor', [VisitorController::class, 'GetVisitorDetails']);

Route::post('/postcontact', [ContactController::class, 'PostContactDetails']);

Route::get('/allsiteinfo', [SiteInfoController::class, 'AllSiteinfo']);

Route::get('/allcategory', [CategoryController::class, 'AllCategory']);

Route::get('/productlistbyremark/{remark}', [ProductListController::class, 'ProductListByRemark']);

Route::get('/productlistbycategory/{category}', [ProductListController::class, 'ProductListByCategory']);

Route::get('/productlistbysubcategory/{category}/{subcategory}', [ProductListController::class, 'ProductListBySubCategory']);

Route::get('/allslider', [SliderController::class, 'AllSlider']);

Route::get('/productdetails/{id}', [ProductDetailsController::class, 'ProductDetails']);

Route::get('/notification', [NotificationController::class, 'NotificationHistory']);

Route::get('/search/{key}', [ProductListController::class, 'ProductBySearch']);
