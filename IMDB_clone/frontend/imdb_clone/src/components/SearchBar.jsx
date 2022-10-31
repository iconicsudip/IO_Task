import React,{useState} from 'react'

export default function SearchBar() {
    const [search,setSearch]= useState("");
    
    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }
    
    return (
        <div>
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <span aria-hidden="true" className="fa fa-search fa-2x rmdb-fa-search"></span>
                    <input type="text" value={search} className="rmdb-searchbar-input" placeholder="Search" onChange={handleSearch}/>
                </div>
            </div>
        </div>
    )
}
