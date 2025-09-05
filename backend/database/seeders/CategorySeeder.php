<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Web Development',
                'description' => 'Learn modern web development technologies',
                'color' => '#10B981'
            ],
            [
                'name' => 'Data Science',
                'description' => 'Master data analysis and machine learning',
                'color' => '#34D399'
            ],
            [
                'name' => 'Mobile Development',
                'description' => 'Build mobile apps for iOS and Android',
                'color' => '#059669'
            ],
            [
                'name' => 'Design',
                'description' => 'UI/UX design and graphic design courses',
                'color' => '#047857'
            ],
            [
                'name' => 'Business',
                'description' => 'Business skills and entrepreneurship',
                'color' => '#065F46'
            ],
            [
                'name' => 'Photography',
                'description' => 'Learn photography techniques and editing',
                'color' => '#064E3B'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}