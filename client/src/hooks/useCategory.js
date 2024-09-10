import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useCategory(){
    const [categories, setCategories] = useState([]);

    // get categories
    const getCategories = async()=>{
        try {
            const {data} = await axios.get('/api/v1/category/categories');
            if(data.success){
                setCategories(data?.category);
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getCategories();
    },[])

    return categories;
}