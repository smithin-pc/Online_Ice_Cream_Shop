import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ICE_CREAM_URL } from '../../ics-constants';

import { setModalShow } from '../../redux/add-edit-modal/add-edit-modal.actions';
import { fetchIcreamStart } from '../../redux/icream/icream.action';
import { onItemEditClick } from '../../redux/menu-item/menu-item.actions';
import IconButton from '../icon-btn/icon-btn.component';
import { IconBtnProps } from '../icon-btn/icon-btn.types';

import './menu-item.styles.scss';
import { MenuItemProps, Item } from './menu-item.types';

const MenuItem = ({ item, isAdmin, isAddItem, showModal, editBtnClicked, getAllICream }: MenuItemProps) => {

    const  { name, flavor, cost, img, calorie, ingredients, imageName, desc  } = item;

    const plusIconBtn: IconBtnProps = {
        iconName: "plus-circle",
        url: "",
        btnName: "",
        disabled: false,
    };

    const minusIconBtn: IconBtnProps = {
        iconName: "dash-circle",
        url: "",
        btnName: "",
        disabled: true,
    };

    const setShowModal = () => {
        if(showModal) {
            showModal(true);
        }
    };

    const handleOnEdit = () => {
        if (editBtnClicked) {
            editBtnClicked(item);
            if (showModal) {
                showModal(true);
            }
        }
    }

    const handleOnDelete = () => {
        if(window.confirm(`Are you sure you want to delete ice-cream ${item.name}`)) {
            const data = {
                name,
                flavor,
                cost,
                calorie,
                ingredients,
                image: img,
                imageName: imageName ? imageName : '',
                delete: true,
            }
            axios.put(`${ICE_CREAM_URL}/${item._id}`, data)
            .then(resp => {
                if (resp.status === 200) {
                    alert(` ${item.name} ice-cream deleted successfully`);
                    if (getAllICream) {
                        getAllICream("");
                    }
                }
            })
        }
    }

    return (
        <div className="menu-item">
            <Card>
                {
                    isAdmin && !isAddItem ?
                        (
                            <div className="modify-btn-group">
                                <span className="modify-btn" onClick={handleOnEdit}><i className="bi bi-pencil-fill custom-icon"></i></span>
                                <span className="modify-btn" onClick={handleOnDelete}><i className="bi bi-trash-fill trash-fill`"></i></span>
                            </div>
                        ) : null
                }
                <Card.Img variant="top" src={img} className={`${desc && desc.includes("add") ? "img-margin" : ""}`}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{desc}</Card.Text>
                    {
                        isAdmin && isAddItem ? <Button variant="primary" onClick={setShowModal}>Add Ice-cream</Button> : null
                    }
                    {
                        !isAdmin && !isAddItem ?
                            (
                                <div className="inc-dec-btn-group">
                                    <IconButton button={minusIconBtn} />
                                    <span>{0}</span>
                                    <IconButton button={plusIconBtn} />
                                </div>
                            ) : null
                    }
                </Card.Body>
            </Card>
        </div>
    )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    showModal: (show: boolean) => dispatch(setModalShow(show)),
    editBtnClicked: (item: Item) => dispatch(onItemEditClick(item)),
    getAllICream: (search: string) => dispatch(fetchIcreamStart(search)),
});

export default connect(null, mapDispatchToProps)(MenuItem);