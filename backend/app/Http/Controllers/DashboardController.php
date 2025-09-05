<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        $user = Auth::user();
        
        $totalCourses = Course::count();
        $enrolledCourses = Enrollment::where('user_id', $user->id)->count();
        $completedLessons = DB::table('lesson_completions')
            ->where('user_id', $user->id)
            ->count();
        $totalLessons = Lesson::count();

        return response()->json([
            'total_courses' => $totalCourses,
            'enrolled_courses' => $enrolledCourses,
            'completed_lessons' => $completedLessons,
            'total_lessons' => $totalLessons,
            'completion_percentage' => $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100, 2) : 0
        ]);
    }

    public function userCourses()
    {
        $courses = Course::with(['instructor', 'category'])
            ->whereHas('enrollments', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->get();

        return response()->json([
            'courses' => $courses
        ]);
    }

    public function progress()
    {
        $progress = DB::table('enrollments')
            ->join('courses', 'enrollments.course_id', '=', 'courses.id')
            ->leftJoin('lesson_completions', function ($join) {
                $join->on('courses.id', '=', 'lesson_completions.course_id')
                     ->where('lesson_completions.user_id', '=', Auth::id());
            })
            ->where('enrollments.user_id', Auth::id())
            ->select(
                'courses.id',
                'courses.title',
                'courses.thumbnail',
                DB::raw('COUNT(lesson_completions.id) as completed_lessons'),
                DB::raw('(SELECT COUNT(*) FROM lessons WHERE course_id = courses.id) as total_lessons')
            )
            ->groupBy('courses.id', 'courses.title', 'courses.thumbnail')
            ->get();

        return response()->json([
            'progress' => $progress
        ]);
    }
}
