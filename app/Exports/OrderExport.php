<?php

namespace App\Exports;

use App\Models\Order;
use Maatwebsite\Excel\Concerns\FromCollection;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\Exportable;

class OrderExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */

    use Exportable;

    protected $datetime;

    public function __construct(Carbon $datetime)
    {
        $this->datetime = $datetime;
    }

    public function collection()
    {
        return Order::join('statuses', 'orders.id', '=', 'statuses.order_id')->where('statuses.status', 5)->whereMonth('statuses.created_at', $this->datetime->month)->whereYear('statuses.created_at', $this->datetime->year)->select(
            'statuses.created_at as created_at',
            'orders.receipt as receipt',
            'orders.customer_name as customer_name',
            'orders.whatsapp_number as whatsapp_number',
            'orders.address as address',
            'orders.payment_method as payment_method',
            'orders.payment_status as payment_status',
            'orders.sub_price as sub_price',
            'orders.discount as discount',
            'orders.price as price',
            'statuses.operator as operator',
        )->get();
    }

    public function map($row): array
    {
        return [
            $row->datetime,
            $row->receipt,
            $row->customer_name,
            $row->whatsapp_number,
            $row->address,
            $row->payment_method,
            $row->payment_status,
            $row->sub_price,
            $row->discount,
            $row->price,
            $row->operator
        ];
    }
}
