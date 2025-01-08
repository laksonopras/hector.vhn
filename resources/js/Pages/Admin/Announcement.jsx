import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout"
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Announcement({auth, ...props}){
    const [rows, setRows] = useState(10)
    const rowOptions = ([5, 10, 15, 20, 25])
    const [currentPage, setCurrentPage] = useState(1);
    let pages = [];
    for (let i = 1; i <= Math.ceil(props.announcements.length / rows) ; i++ ) {
        pages.push(i);
    }
    
    const announcements = props.announcements.slice((currentPage - 1) * rows , currentPage * rows)

    const {data, setData, errors, post} = useForm()

    const [modalOpen, setModalOpen] = useState(false)
    
    const addAnnouncement = (e) => {
        e.preventDefault()
        setModalOpen(true)
        setData({
            id : null,
            title: '',
            content: '',
        })
    }

    const showAnnouncement = (e, announcement) => {
        e.preventDefault()
        setModalOpen(true)
        setData({
            id : announcement.id,
            title: announcement.title,
            content: announcement.content,
        })
    }
    const submit = (e) => {
        e.preventDefault()
        if(data.title && data.content){
            post('/pengumuman', data)
            setModalOpen(false)
        } else {
            Swal.fire({
                text: 'Formulir tidak boleh ada yang kosong.',
                icon: "error"
            });
        }
    };

    return(
        <AdminLayout user={auth.user} >
            <h1 className="p-5 text-xl border-b border-light-3">Pengumuman</h1>
            <div className="p-5 space-y-5">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                        <p>Jumlah baris</p>
                        <Dropdown className="w-auto">
                            <Dropdown.Trigger>
                                <button  className="flex items-center border border-light-3 shadow-sm">
                                    <p className="px-1">{rows}</p>
                                    <svg className="px-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15z"/></svg>                 
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content className="w-content">
                                {rowOptions.map((rowOption, index) => {
                                    return(
                                        <button key={index} onClick={() => setRows(rowOption)} className="mx-2 py-full px-1">{rowOption}</button>
                                    )
                                })}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <button onClick={(e) => addAnnouncement(e)} className="px-5 py-1.5 shadow-md btn-submit rounded-lg" >Tambah</button>
                    <Modal show={modalOpen} onClose={() => setModalOpen(false)} maxWidth='xl'>
                        <form className='p-7 space-y-7 flex flex-col'>
                            <h1 className="mx-auto text-3xl  font-semibold">Buat Pengumuman</h1>
                            <div className="flex flex-col space-y-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="" className="text-sm">Judul :</label>
                                    <input type="text" name='title' value={data.title} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-2 text-input" />
                                    <InputError message={errors.title} className="text-xs text-danger-1" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="" className="text-sm">Isi :</label>
                                    <textarea type="text" name='content' value={data.content} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-2 text-input" />
                                    <InputError message={errors.content} className="text-xs text-danger-1" />
                                </div>
                            </div>
                            <div className="flex items-center justify-end space-x-3">
                                <button onClick={() => setModalOpen(false)} className="px-5 py-1.5 rounded-md btn-danger">{data.id == null ? 'Batal' : 'Tutup'}</button>
                                {data.id == null ? <button onClick={(e) => submit(e)} className="px-5 py-1.5 rounded-md btn-submit">Simpan</button> : <></>}
                                
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="rounded-md border border-light-3 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="table-header">
                                <th className="py-3 px-2">No</th>
                                <th className="py-3 px-2">Judul</th>
                                <th className="py-3 px-2">Tanggal</th>
                                <th className="py-3 px-2">Aktivitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.length == 0 ?
                                <tr className="bg-light-1">
                                    <td colSpan={4} className="py-2.5 px-1 text-center text-sm italic">Tidak ada data yang ditampilkan.</td>
                                </tr> 
                            : announcements.map((announcement, index) => {
                                return(
                                    <tr key={index} className={'text-black ' + ( index  % 2 == 0 ? 'bg-light-1 ' : 'bg-white ')}>
                                        <td className='px-1 text-center'>{(index + 1) + ((currentPage - 1) * rows)}</td>
                                        <td className='px-1 text-center'>{announcement.title}</td>
                                        <td className='px-1 text-center'>{announcement.created_at}</td>
                                        <td className='py-3 text-center flex justify-center'>
                                            <a onClick={(e) => showAnnouncement(e, announcement)} className="p-1 btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={2}><path d="M3 12c5.4-8 12.6-8 18 0c-5.4 8-12.6 8-18 0z"></path><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0z"></path></g></svg></a>
                                        </td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between space-x-1">
                    <p>Show {announcements.length == 0 ? 0 : ((currentPage - 1) * rows) + 1} to {((currentPage - 1) * rows) + announcements.length} of {props.announcements.length} entries</p>
                    <div className="flex items-stretch space-x-1">
                        <button onClick={() => setCurrentPage((prev) => prev - 1 )} disabled={currentPage == 1} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == 1 ? 'bg-light-1 ' : 'bg-white ')} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={2} d="M17 2L7 12l10 10"></path></svg></button>
                        <button onClick={() => setCurrentPage((prev) => prev + 1 )} disabled={currentPage == Math.max(...pages)} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == Math.max(...pages) ? 'bg-light-1 ' : 'bg-white ')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"></path></svg></button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}