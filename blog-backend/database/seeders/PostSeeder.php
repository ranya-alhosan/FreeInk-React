<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    public function run()
    {
        // Use Faker to generate realistic dummy data
        $faker = \Faker\Factory::create();

        // Define a base URL for your images
        $baseUrl = 'http://localhost:8000/storage/posts/';

        

        // Insert multiple posts
        for ($i = 0; $i < 20; $i++) {
            DB::table('posts')->insert([
                'title' => $faker->sentence, // Generate a random title
                'content' => $faker->paragraph(5), // Generate a random paragraph
                'user_id' => rand(1, 59), // Assign posts to users with IDs between 1 and 10
                'category_id' => rand(1, 8), // Assign a random category ID between 1 and 8
                'img' => $baseUrl . $faker->lexify('image_????.jpg'), // Generate a dynamic URL
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
