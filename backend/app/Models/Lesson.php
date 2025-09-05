<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'video_url',
        'duration',
        'course_id',
        'order',
        'is_free'
    ];

    protected $casts = [
        'is_free' => 'boolean'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
