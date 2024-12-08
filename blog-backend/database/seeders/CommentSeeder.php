<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentSeeder extends Seeder
{
    public function run()
    {
        // Use Faker to generate realistic dummy data
        $faker = \Faker\Factory::create();

        // Insert multiple comments
        for ($i = 0; $i < 50; $i++) {
            DB::table('comments')->insert([
                'content' => $faker->sentence, // Random comment text
                'user_id' => rand(1, 59), // Random user ID (adjust based on the number of users)
                'post_id' => rand(27, 46), // Random post ID (adjust based on the number of posts)
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
