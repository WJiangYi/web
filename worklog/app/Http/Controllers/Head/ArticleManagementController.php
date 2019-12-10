<?php

namespace App\Http\Controllers\Head;

use App\Http\Requests\Head\ArticlePostRequest;
use App\Http\Requests\Head\CategoryIdGetRequest;
use App\Models\Articles;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ArticleManagementController extends Controller
{
    public function index(CategoryIdGetRequest $request, Articles $articles)
    {
        try{
            if ($request->input('category_id')==0) {
                $result = $articles->getBase()->paginate(25);
            }else {
                $result = $articles->getBase()->where('articles.article_category_id','=',$request->category_id)->paginate(25);
            }
        }catch (\Exception $e){
            return response()->fail(100,'服务器错误!',null,500);
        }
        if ($result->isEmpty()){
            return response()->fail(100,'获取失败!',null);
        }
        $result->appends(['category_id'=>$request->input('category_id')])->render();
        return response()->success(200,'获取成功!',$result);

    }

    public function create(){

    }

    public function store(ArticlePostRequest $request, Articles $articles)
    {
        try{
            $result = $articles->create($request,$articles);
        }catch (\Exception $e){
            return response()->fail(100,'服务器错误!',null,500);
        }
        if ($result){
            return response()->success(200,'添加成功!',null);
        }
        return response()->fail(100,'添加失败!',null);
    }

    public function show($id, Articles $articles)
    {
        try{
            $result = $articles->getAllArticles($id);
        }catch (\Exception $e){
            return response()->fail(100,'服务器错误!',null,500);
        }
        if ($result->isEmpty()){
            return response()->fail(100,'获取失败!',null);
        }
        return response()->success(200,'获取成功!',$result);
    }

    public function edit($id){

    }

    public function update(Request $request, $id)
    {
        try{
            $result = (new Articles)->renewal($request, $id);
        }catch (\Exception $e){
            return response()->fail(100,'服务器错误!',null,500);
        }
        if ($result){
            return response()->success(200,'修改成功!',null);
        }
        return response()->fail(100,'修改失败!',null);
    }

    public function destroy($id)
    {
        try{
            $result = (new Articles)->remove($id);
        }catch (\Exception $e){
            return response()->fail(100,'服务器错误!',null,500);
        }
        if ($result){
            return response()->success(200,'删除成功!',null);
        }
        return response()->fail(100,'删除失败!',null);
    }
}
