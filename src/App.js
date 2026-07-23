import { useState } from "react";
// import './styles.css';

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
    return <>
        <FilterableProductTable products={PRODUCTS} />
        <TrafficLight />
    </>
}

function TrafficLight() {
    const [walk, setWalk] = useState(true);
    const [isChanging, setIsChanging] = useState(false);

    function handleClick() {
        setIsChanging(true);
        setTimeout(() => {
            setWalk(!walk);
            setIsChanging(false);
        }, 3000);
    }

    return (
        <div style={{paddingTop: 30}}>
            <button 
            onClick={handleClick}
            disabled={isChanging}
            >
                {walk ? 'Turn to stop' : 'Turn to walk'}
            </button>
            {isChanging ? 
            <h1
            style={{color: 'orange'}}>
                {walk ? 'Prepare to stop' : 'Prepare to set off'}
            </h1> : 
            <h1
            style={walk ? {color: 'green'} : {color: 'red'}}>
                {walk ? 'Walk' : 'Stop'}
            </h1>}
            
            <div className="trafficLight">
                <div className={walk ? 'off-light' : 'red-light'}></div>
                <div className={isChanging ? 'orange-light' : 'off-light'}></div>
                <div className={walk && !isChanging ? 'green-light' : 'off-light'}></div>
            </div>
        </div>
    )
}

function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <>
            <SearchBar 
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={setFilterText}
            onInStockOnlyChange={setInStockOnly}/>

            <ProductTable 
            products={products}
            filterText={filterText}
            inStockOnly={inStockOnly}/>

        </>
    )
};

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
    return (
        <form>
            <input
            type="text"
            value={filterText}
            onChange={e => onFilterTextChange(e.target.value)}
            placeholder="Search..." 
             />
            <div>
                <input
                 type="checkbox" 
                checked={inStockOnly}
                onChange={e => onInStockOnlyChange(e.target.checked)}/>
                <label>Only show products in stock</label>
            </div>
        </form>
    )
};

function ProductTable({ products, filterText, inStockOnly }) {
    
    let rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (inStockOnly && !product.stocked) {
            return;
        }
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }
        if (lastCategory !== product.category) {
            rows.push(
            <ProductCategoryRow 
            category={product.category}
            key={product.category} />
            );

            lastCategory = product.category;
        }
        rows.push(
        <ProductRow 
        product={product}
        key={product.name} />
        );
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
};

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2">{category}</th>
        </tr>
    );
}

function ProductRow({ product }) {
    const name = product.stocked ? product.name : <span style={{color: "red"}}>{product.name}</span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}