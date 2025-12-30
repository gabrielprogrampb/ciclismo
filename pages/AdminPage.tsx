import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import Modal from '../components/Modal';
import { Bike, Route, Article, BikeCategory, BikeCondition } from '../types';

type Tab = 'bikes' | 'routes' | 'articles';
type ModalMode = 'add' | 'edit';

const AdminPage: React.FC = () => {
    const {
        bikes, addBike, updateBike, deleteBike,
        routes, addRoute, updateRoute, deleteRoute,
        articles, addArticle, updateArticle, deleteArticle
    } = useData();
    
    const [activeTab, setActiveTab] = useState<Tab>('bikes');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>('add');
    const [currentItem, setCurrentItem] = useState<Bike | Route | Article | null>(null);
    const [formState, setFormState] = useState<any>({});
    
    const inputClass = "w-full p-2 border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent";

    const handleOpenModal = (mode: ModalMode, item: any | null = null) => {
        setModalMode(mode);
        setCurrentItem(item);
        // Ensure images is always an array for the bike form
        const initialFormState = item ? { ...item } : {};
        if (activeTab === 'bikes' && initialFormState.images && !Array.isArray(initialFormState.images)) {
            initialFormState.images = [initialFormState.images];
        }
        setFormState(initialFormState);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        setFormState({});
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'number') {
            setFormState({ ...formState, [name]: parseFloat(value) || 0 });
        } else {
            setFormState({ ...formState, [name]: value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState({ ...formState, [fieldName]: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormState(prevState => ({
                        ...prevState,
                        [fieldName]: [...(prevState[fieldName] || []), reader.result as string],
                    }));
                };
                reader.readAsDataURL(file);
            });
        }
    };
    
    const removeImage = (index: number, fieldName: string) => {
        setFormState(prevState => ({
            ...prevState,
            [fieldName]: prevState[fieldName].filter((_: any, i: number) => i !== index),
        }));
    };

    const addImageUrl = (fieldName: string) => {
        const url = (document.getElementById(`${fieldName}-url-input`) as HTMLInputElement).value;
        if (url) {
            setFormState(prevState => ({
                ...prevState,
                [fieldName]: [...(prevState[fieldName] || []), url]
            }));
            (document.getElementById(`${fieldName}-url-input`) as HTMLInputElement).value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (modalMode === 'add') {
            if (activeTab === 'bikes') addBike(formState);
            if (activeTab === 'routes') addRoute(formState);
            if (activeTab === 'articles') addArticle(formState);
        } else {
            if (activeTab === 'bikes') updateBike(formState);
            if (activeTab === 'routes') updateRoute(formState);
            if (activeTab === 'articles') updateArticle(formState);
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            if (activeTab === 'bikes') deleteBike(id);
            if (activeTab === 'routes') deleteRoute(id);
            if (activeTab === 'articles') deleteArticle(id);
        }
    };
    
    const renderForm = () => {
        switch (activeTab) {
            case 'bikes': return (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formState.title || ''} onChange={handleFormChange} placeholder="Título" required className={inputClass} />
                    <textarea name="description" value={formState.description || ''} onChange={handleFormChange} placeholder="Descripción" required className={inputClass} />
                    <div className="grid grid-cols-2 gap-4">
                        <select name="category" value={formState.category || ''} onChange={handleFormChange} required className={inputClass}>
                            <option value="">Seleccionar Categoría</option>
                            {Object.values(BikeCategory).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                         <select name="condition" value={formState.condition || ''} onChange={handleFormChange} required className={inputClass}>
                            <option value="">Seleccionar Condición</option>
                            {Object.values(BikeCondition).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <input name="brand" value={formState.brand || ''} onChange={handleFormChange} placeholder="Marca" required className={inputClass} />
                        <input name="model" value={formState.model || ''} onChange={handleFormChange} placeholder="Modelo" required className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="frameSize" value={formState.frameSize || ''} onChange={handleFormChange} placeholder="Talla" required className={inputClass} />
                        <input name="price" type="number" value={formState.price || ''} onChange={handleFormChange} placeholder="Precio (USD)" required className={inputClass} />
                    </div>
                    <input name="location" value={formState.location || ''} onChange={handleFormChange} placeholder="Ubicación" required className={inputClass} />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
                        <div className="p-2 border rounded-md bg-gray-50 space-y-3">
                            <div className="grid grid-cols-3 gap-2">
                                {(formState.images || []).map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img src={img} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md border bg-white" />
                                        <button type="button" onClick={() => removeImage(index, 'images')} className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Eliminar imagen">&times;</button>
                                    </div>
                                ))}
                            </div>
                             <div className="flex items-center space-x-2">
                                <input type="url" id="images-url-input" placeholder="Añadir por URL" className={inputClass} />
                                <button type="button" onClick={() => addImageUrl('images')} className="px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300">Añadir</button>
                            </div>
                            <div>
                                <label htmlFor="images-upload" className="block w-full text-center px-4 py-3 border-2 border-dashed rounded-md cursor-pointer hover:border-brand-primary hover:bg-blue-50 text-sm text-gray-600">
                                    + Subir desde dispositivo
                                </label>
                                <input id="images-upload" type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleMultipleFilesChange(e, 'images')} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-brand-primary text-white p-2 rounded hover:bg-blue-700">Guardar</button>
                </form>
            );
            case 'routes': return (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" value={formState.name || ''} onChange={handleFormChange} placeholder="Nombre de la ruta" required className={inputClass} />
                    <input name="location" value={formState.location || ''} onChange={handleFormChange} placeholder="Ubicación" required className={inputClass} />
                    <div className="grid grid-cols-2 gap-4">
                        <input name="distance" type="number" value={formState.distance || ''} onChange={handleFormChange} placeholder="Distancia (km)" required className={inputClass} />
                        <input name="elevation" type="number" value={formState.elevation || ''} onChange={handleFormChange} placeholder="Elevación (m)" required className={inputClass} />
                    </div>
                    <textarea name="shortDescription" value={formState.shortDescription || ''} onChange={handleFormChange} placeholder="Descripción corta" required className={inputClass} />
                    <textarea name="fullDescription" value={formState.fullDescription || ''} onChange={handleFormChange} placeholder="Descripción completa" required className={inputClass} rows={4}/>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de la ruta</label>
                        <input name="image" value={formState.image || ''} onChange={handleFormChange} placeholder="URL de la imagen" className={inputClass} />
                        <label htmlFor="image-upload" className="text-sm text-gray-500 block my-2">O subir desde dispositivo:</label>
                        <input id="image-upload" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"/>
                        {formState.image && <img src={formState.image} alt="Preview" className="mt-2 h-32 w-auto object-contain rounded-md border bg-white p-1" />}
                    </div>

                    <input name="mapEmbedUrl" value={formState.mapEmbedUrl || ''} onChange={handleFormChange} placeholder="URL de Embed del Mapa" required className={inputClass} />
                    <textarea name="pointsOfInterest" value={Array.isArray(formState.pointsOfInterest) ? formState.pointsOfInterest.join(', ') : ''} onChange={e => setFormState({...formState, pointsOfInterest: e.target.value.split(',').map(s => s.trim())})} placeholder="Puntos de interés (separados por comas)" className={inputClass} />
                    <button type="submit" className="w-full bg-brand-primary text-white p-2 rounded hover:bg-blue-700">Guardar</button>
                </form>
            );
            case 'articles': return (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formState.title || ''} onChange={handleFormChange} placeholder="Título del artículo" required className={inputClass} />
                    <div className="grid grid-cols-2 gap-4">
                        <input name="category" value={formState.category || ''} onChange={handleFormChange} placeholder="Categoría" required className={inputClass} />
                        <input name="author" value={formState.author || ''} onChange={handleFormChange} placeholder="Autor" required className={inputClass} />
                    </div>
                    <textarea name="content" value={formState.content || ''} onChange={handleFormChange} placeholder="Contenido" required className={inputClass} rows={6}/>
                    
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen destacada</label>
                        <input name="featuredImage" value={formState.featuredImage || ''} onChange={handleFormChange} placeholder="URL de la imagen" className={inputClass} />
                        <label htmlFor="featuredImage-upload" className="text-sm text-gray-500 block my-2">O subir desde dispositivo:</label>
                        <input id="featuredImage-upload" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'featuredImage')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-primary hover:file:bg-blue-100"/>
                        {formState.featuredImage && <img src={formState.featuredImage} alt="Preview" className="mt-2 h-32 w-auto object-contain rounded-md border bg-white p-1" />}
                    </div>

                    <button type="submit" className="w-full bg-brand-primary text-white p-2 rounded hover:bg-blue-700">Guardar</button>
                </form>
            );
            default: return null;
        }
    };
    
    const renderTable = () => {
        const data = { bikes, routes, articles }[activeTab];
        const headers = {
            bikes: ['Título', 'Marca', 'Precio', 'Ubicación'],
            routes: ['Nombre', 'Ubicación', 'Distancia'],
            articles: ['Título', 'Categoría', 'Autor']
        };

        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-brand-dark">Gestionar {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                    <button onClick={() => handleOpenModal('add')} className="bg-brand-secondary text-white px-4 py-2 rounded hover:bg-green-700">Añadir Nuevo</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                {headers[activeTab].map(h => <th key={h} className="p-3 font-semibold">{h}</th>)}
                                <th className="p-3 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    {activeTab === 'bikes' && <>
                                        <td className="p-3">{(item as Bike).title}</td>
                                        <td className="p-3">{(item as Bike).brand}</td>
                                        <td className="p-3">${(item as Bike).price}</td>
                                        <td className="p-3">{(item as Bike).location}</td>
                                    </>}
                                    {activeTab === 'routes' && <>
                                        <td className="p-3">{(item as Route).name}</td>
                                        <td className="p-3">{(item as Route).location}</td>
                                        <td className="p-3">{(item as Route).distance} km</td>
                                    </>}
                                    {activeTab === 'articles' && <>
                                        <td className="p-3">{(item as Article).title}</td>
                                        <td className="p-3">{(item as Article).category}</td>
                                        <td className="p-3">{(item as Article).author}</td>
                                    </>}
                                    <td className="p-3 text-right space-x-2">
                                        <button onClick={() => handleOpenModal('edit', item)} className="text-blue-600 hover:underline">Editar</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-brand-dark mb-8">Panel de Administración</h1>
            <div className="flex border-b mb-6">
                <button onClick={() => setActiveTab('bikes')} className={`py-2 px-4 font-semibold ${activeTab === 'bikes' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}>Bicicletas</button>
                <button onClick={() => setActiveTab('routes')} className={`py-2 px-4 font-semibold ${activeTab === 'routes' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}>Rutas</button>
                <button onClick={() => setActiveTab('articles')} className={`py-2 px-4 font-semibold ${activeTab === 'articles' ? 'border-b-2 border-brand-primary text-brand-primary' : 'text-gray-500'}`}>Consejos</button>
            </div>
            
            {renderTable()}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`${modalMode === 'add' ? 'Añadir' : 'Editar'} ${activeTab.slice(0, -1)}`}>
                {renderForm()}
            </Modal>
        </div>
    );
};

export default AdminPage;