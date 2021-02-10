<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/', function () {
  return File::get(public_path().'/index.html');
});


Route::get('art', function () {
  $art = DB::select('SELECT * FROM art ORDER BY id ASC');
  return $art;
});

Route::post('art', function (Request $request) {
  DB::insert('INSERT INTO art (artist, title, location, image) VALUES (?, ?, ?, ?)', [$request->artist, $request->title, $request->location, $request->image]);
  $art = DB::select('SELECT * FROM art ORDER BY id ASC');
  return $art;
});

Route::put('art/{id}', function (Request $request, $id) {
  DB::update('UPDATE art SET artist=?, title=?, location=?, image=? WHERE id = ?', [$request->artist, $request->title, $request->location, $request->image, $id]);
  $art = DB::select('SELECT * FROM art ORDER BY id ASC');
  return $art;
});

Route::delete('art/{id}', function ($id) {
  DB::delete('DELETE FROM art WHERE id = ?', [$id]);
  $art = DB::select('SELECT * FROM art ORDER BY id ASC');
  return $art;
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
?>
