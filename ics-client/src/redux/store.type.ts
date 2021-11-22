import { ModalState } from "./add-edit-modal/add.edit-modal.types";
import { ICreamState } from "./icream/icream.types";
import { MenuItemState } from "./menu-item/menu-item.types";
import { UserState } from "./user/user.types";

export interface RootState {
    user: UserState,
    modal: ModalState,
    icream: ICreamState,
    menu: MenuItemState,
}

export default RootState;