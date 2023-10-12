import React, {Component} from "react";
import BrandService from "../services/BrandService";

class ListBrandsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: []
        }
    }

    componentDidMount() {
        BrandService.getBrands()
            .then((res) => {
                this.setState({brands: res.data});
            })
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Brands list</h2>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Brand id</th>
                        <th>Brand name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.brands.map(brand => (
                        <tr key={brand.id}>
                            <td>{brand.id}</td>
                            <td>{brand.brand}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default ListBrandsComponent;