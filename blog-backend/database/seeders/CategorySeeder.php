<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{   
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['name' => 'Health & Sport'],
            ['name' => 'Romance & Relationships'],
            ['name' => 'Food & Recipes'],
            ['name' => 'Travel & Adventure'],
            ['name' => 'Education & Learning'],
            ['name' => 'Politics & Current Affairs'],
            ['name' => 'Art & Creativity'],
            ['name' => 'History & Culture'],
        ];

        DB::table('categories')->insert($categories);
    }
}
