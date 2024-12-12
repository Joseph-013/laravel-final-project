<?php

namespace App\Http\Controllers;

use App\Helpers\Toast;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class OrderController extends Controller
{
    public static function storeOrder() {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status_query = $request->query('status');
        $orders = Order::where('user_id', Auth::id())
            ->where('status', '!=', 'Cart')
            ->with('product')
            ->with('files')
            ->when($status_query, function(Builder $query, string $status_query) {
                $query->where('status','=', $status_query);
            })
            ->orderByRaw("FIELD(status, 'Pending', 'Completed', 'Cancelled')")
            ->orderBy('updated_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/ManageOrders', ['orders' => $orders->items(), 'currentPage'=>$orders->currentPage(), 'lastPage'=>$orders->lastPage(), 'prevPageUrl'=>$orders->previousPageUrl(),'nextPageUrl'=>$orders->nextPageUrl()]);
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
            'address' => $data['address'],
            'order_deadline_date' => $data['order_deadline_date'],
            'order_deadline_time' => $data['order_deadline_time'],
            'pickup_type' => $data['pickup_type'],
            'address' => $data['address'] ?? Auth::user()->default_address,
            'status' => 'Pending',
        ]);

        OrderFiles::createAndStore($data['files'], $order->id);

        Toast::success('Order successfully submitted!');

        return redirect()->route('orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('user')->with('files')->with('product')->find($id);

        return Inertia::render('Admin/ManageSingularOrder',['order'=>$order]);
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
