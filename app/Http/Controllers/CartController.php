<?php

namespace App\Http\Controllers;

use App\Helpers\Toast;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $carts = Order::where(
            'user_id',
            Auth::id()
        )->cart()->with('product')->with('files')->get();

        return Inertia::render('Cart', ['carts' => $carts]);
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
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();

        $order = Order::create([
            'user_id' => Auth::id(),
            'product_id' => $data['product_id'],
            'specifications' => $data['specifications'],
            'quantity' => $data['quantity'],
            'order_deadline_date' => $data['order_deadline_date'],
            'order_deadline_time' => $data['order_deadline_time'],
            'pickup_type' => $data['pickup_type'],
            'status' => 'Cart',
        ]);

        OrderFiles::createAndStore($data['files'], $order->id);

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
    public function destroy(string $id)
    {
        //
    }

    public function batchSend(Request $request)
    {
        $carts = Order::where('user_id', Auth::id())->get();

        if ($carts->isNotEmpty()) {
            Order::where('user_id', Auth::id())->update(['status' => 'Pending']);
            Toast::success('All cart items successfully submitted.');
            return redirect()->back();
        } else {
            abort(404);
        }
    }
}
