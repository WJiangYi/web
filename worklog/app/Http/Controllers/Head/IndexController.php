<?php

namespace App\Http\Controllers\Head;

use App\Http\Requests\Head\CategoryIdGetRequest;
use App\Http\Requests\Head\ContentGetRequest;
use App\Models\Articles;
use App\Models\Categorys;
use App\Models\NavigationColumns;
use App\Http\Controllers\Controller;
use App\Models\Rotations;
use App\Models\StudyRoutes;
use App\Models\TopArticles;

class IndexController extends Controller
{
    public function getNavigationBar()
    {
        try {
            $result = (new NavigationColumns)->getAll();
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function getClassifyBay()
    {
        try {
            $result = Categorys::with('allChild')->get();
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function getLearnRecommend(CategoryIdGetRequest $request)
    {
        try {
            $result = (new TopArticles)->getAllRecommend($request, 0);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        $res = $result->toArray();
        for ($i = 0; $i < sizeof($res); $i++) {
            $s[$i] = $result[$i]->article_id;
        }
        if (!$result->isEmpty() && sizeof($res) > 8) {
            return response()->success(200, '获取成功!', $result);
        }
        if (!$result->isEmpty() && sizeof($res) < 9) {
            try {
                $more = (new TopArticles)->getAllRecommend($request, sizeof($res));
            } catch (\Exception $e) {
                return response()->fail(100, '服务器错误!', null, 500);
            }
            $totle = sizeof($res) + sizeof($more->toArray());
            if (!$more->isEmpty()) {
                $j = 0;
                for ($i = sizeof($res); $i < $totle; $i++) {
                    $res[$i]['article_title'] = $more[$j]->article_title;
                    $res[$i]['article_intro'] = $more[$j]->article_intro;
                    $res[$i]['cover_picture_url'] = $more[$j]->cover_picture_url;
                    $j++;
                }
                return response()->success(200, '获取成功!', $res);
            }
            return response()->success(200, '获取成功!', $result);
        }
        return response()->fail(100, '获取失败!', null);
    }

    public function getBlogRoll(CategoryIdGetRequest $request)
    {
        try {
            $result = (new Categorys)->getAll($request);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function getLearnPath(CategoryIdGetRequest $request)
    {
        try {
            $result = (new Categorys)->getPath($request);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function getRecent()
    {
        try {
            $result = (new Articles)->getRecent();
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function getAssignLearnPath($id)
    {
        try {
            $result = (new StudyRoutes)->getAssignPath($id);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function getAssignLearnRecommend($id)
    {
        try {
            $result = (new TopArticles)->getAssignRecommend($id);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function getSlideshow()
    {
        try {
            $result = (new Rotations)->getAll();
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function getAllLearnPath(CategoryIdGetRequest $request)
    {
        if ($request->input('category_id') == 0) {
            try {
                $result = (new Categorys)->getAllPath()->paginate(20);
            } catch (\Exception $e) {
                return response()->fail(100, '服务器错误!', null, 500);
            }
        } else {
            try {
                $result = (new Categorys)->getAllPath()
                    ->where('categorys.category_id', $request->input('category_id'))
                    ->paginate(20);
            } catch (\Exception $e) {
                return response()->fail(100, '服务器错误!', null, 500);
            }
        }
        $result->appends(['category_id' => $request->input('category_id')])->render();
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }

    public function search(ContentGetRequest $request)
    {
        try {
            $result = (new Articles)->getSearchResult($request);
        } catch (\Exception $e) {
            return response()->fail(100, '服务器错误!', null, 500);
        }
        $result->appends(['content' => $request->input('content')])->render();
        if ($result->isEmpty()) {
            return response()->fail(100, '获取失败!', null);
        }
        return response()->success(200, '获取成功!', $result);
    }
}
