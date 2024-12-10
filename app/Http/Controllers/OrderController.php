<?php

namespace App\Http\Controllers;

use App\Helpers\Toast;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())
            ->where('status', '!=', 'Cart')
            ->with('product')->with('files')->get();

        return Inertia::render('Orders', ['orders' => $orders]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {

        // $dataFiles = $request->input('files');
        $data = $request->validated();

        // dd($request->all());

        dd($data['files']);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        // check if order belongs to user
        $order = Order::where([
            'user_id' => $request->user()->id,
            'id' => $id
        ])->firstOrFail();

        // delete order
        $order->delete();

        return back()->with('success');
    }
}
