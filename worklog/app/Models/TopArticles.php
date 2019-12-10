<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class TopArticles extends Model
{
    protected $table = 'top_articles';
    protected $primaryKey = 'top_id';
    public $timestamps = false;
    public $guarded = ['top_id'];

    public function getAllRecommend(Request $request, $num){
        return $this->select('articles.article_id','article_title','article_intro','cover_picture_url')
            ->leftjoin('articles','top_articles.article_id','articles.article_id')
            ->leftjoin('cover_pictures','articles.cover_picture_id','cover_pictures.cover_picture_id')
            ->where('articles.article_category_id',$request->input('category_id'))
            ->where('article_state',1)
            ->limit(9-$num)
            ->latest('article_create_time')
            ->get();
    }

    public function getAssignRecommend($id){
        return $this->select('article_title','article_intro','article_content','article_create_time','article_update_time','cover_picture_url','article_video_id')
            ->leftjoin('articles','top_articles.article_id','articles.article_id')
            ->leftjoin('cover_pictures','articles.cover_picture_id','cover_pictures.cover_picture_id')
            ->where('articles.article_id',$id)
            ->where('article_state',1)
            ->get();
    }
}
