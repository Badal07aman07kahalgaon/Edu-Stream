<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with(['instructor', 'category'])
            ->where('is_published', true)
            ->paginate(12);

        return response()->json([
            'courses' => $courses
        ]);
    }

    public function show($id)
    {
        $course = Course::with(['instructor', 'category', 'lessons'])
            ->where('id', $id)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json([
            'course' => $course
        ]);
    }

    public function enroll(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        
        // Check if user is already enrolled
        $existingEnrollment = Enrollment::where('user_id', Auth::id())
            ->where('course_id', $id)
            ->first();

        if ($existingEnrollment) {
            return response()->json([
                'message' => 'You are already enrolled in this course'
            ], 400);
        }

        $enrollment = Enrollment::create([
            'user_id' => Auth::id(),
            'course_id' => $id,
            'enrolled_at' => now(),
        ]);

        return response()->json([
            'enrollment' => $enrollment,
            'message' => 'Successfully enrolled in course'
        ], 201);
    }
}
