<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $items = Menu::all();
        return Inertia::render('Admin/Menu/Index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Menu/CreateEdit', [
            'categories' => \App\Models\Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_ar' => 'required|string',
            'price' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'image_url' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('dishes', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        Menu::create($validated);

        return redirect()->route('admin.menu.index')->with('success', 'Dish added successfully.');
    }

    public function edit(Menu $menu)
    {
        return Inertia::render('Admin/Menu/CreateEdit', [
            'item' => $menu,
            'categories' => \App\Models\Category::all()
        ]);
    }

    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_ar' => 'required|string',
            'price' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'image_url' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('dishes', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $menu->update($validated);

        return redirect()->route('admin.menu.index')->with('success', 'Dish updated successfully.');
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return redirect()->route('admin.menu.index')->with('success', 'Dish deleted successfully.');
    }
}
