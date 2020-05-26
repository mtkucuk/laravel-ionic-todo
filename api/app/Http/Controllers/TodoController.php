<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Todo;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json(Todo::orderBy('date','desc')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = [];
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'date' => 'required|date'
        ], [
            'title.required' => 'Başlığı boş geçmeyiniz',
            'date.required' => 'Tarihi boş geçmeyiniz',
            'date.date' => 'Geçerli bir tarih formatı giriniz.'
        ]);
        if ($validator->fails()) {

            $data['success'] = false;
            $data['msg'] = $validator->messages();
        } else {
            try {
                $todo = new Todo();
                $todo->title = $request->get('title');
                $todo->desc = $request->get('desc');
                $todo->date = $request->get('date');
                $todo->status = $request->get('status');
                $todo->save();
                if ($todo->id > 0) {

                    $data['success'] = true;
                    $data['msg'] = "Kayıt ekleme işlemi başarı ile yapılmıştır";
                    $data['data'] = $todo;
                } else {
                    $data['success'] = false;
                    $data['msg'] = "Kayıt ekleme sırasında bir problem oluştu.Bilgileri kontrol edip tekrar deneyiniz";
                }
            } catch (\Exception $ex) {
                $data['success'] = false;
                $data['msg'] = $ex->getMessage();
            }
        }
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = [];
        $todo = Todo::where('id', '=', $id);
        try {
            if ($todo->count() > 0) {


                $data['success'] = true;
                $data['data'] = $todo->first();

            } else {
                $data['success'] = false;
                $data['msg'] = "Kayıt bulunamadı";
            }
        } catch (\Exception $ex) {
            $data['success'] = false;
            $data['msg'] = $ex->getMessage();
        }

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $data = [];
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'date' => 'required|date'
        ], [
            'title.required' => 'Başlığı boş geçmeyiniz',
            'date.required' => 'Tarihi boş geçmeyiniz',
            'date.date' => 'Geçerli bir tarih formatı giriniz.'
        ]);
        if ($validator->fails()) {

            $data['success'] = false;
            $data['msg'] = $validator->messages();
        } else {
            try {
                $todo = Todo::find($id);
                $todo->title = $request->get('title');
                $todo->desc = $request->get('desc');
                $todo->date = $request->get('date');
                $todo->status = $request->get('status');
                $todo->save();
                if ($todo->id > 0) {

                    $data['success'] = true;
                    $data['msg'] = "Kayıt güncelleme işlemi başarı ile yapılmıştır";
                    $data['data'] = $todo;
                } else {
                    $data['success'] = false;
                    $data['msg'] = "Kayıt güncelleme sırasında bir problem oluştu.Bilgileri kontrol edip tekrar deneyiniz";
                }
            } catch (\Exception $ex) {
                $data['success'] = false;
                $data['msg'] = $ex->getMessage();
            }
        }
        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $data = [];
        $todo = Todo::where('id', '=', $id);
        try {
            if ($todo->count() > 0) {
                if ($todo->delete()) {

                    $data['success'] = true;
                    $data['msg'] = "Kayıt silme işlemi başarı ile yapılmıştır.";
                } else {
                    $data['success'] = false;
                    $data['msg'] = "Silme işlemi sırasında bir problem oluştu.Kontrol edip tekrar deneyiniz";
                }
            } else {
                $data['success'] = false;
                $data['msg'] = "Silinecek kayıt bulunamadı";
            }
        } catch (\Exception $ex) {
            $data['success'] = false;
            $data['msg'] = $ex->getMessage();
        }

        return response()->json($data);
    }
}
