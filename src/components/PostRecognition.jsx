import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import AdjustIcon from '@material-ui/icons/Adjust';
import classNames from 'classnames';
import { Avatar, IconButton, TextField, Tooltip, Button } from '@material-ui/core';
import { titleize } from '../assets/Util/text';
import EmojiIcon from '@material-ui/icons/InsertEmoticon';
import CameraIcon from '@material-ui/icons/AddAPhoto';
import GifIcon from '@material-ui/icons/Gif';
import { getImageForBadge } from '../assets/Util/BadgesInfo';

import BongCaiAva from '../assets/images/avatars/bongcai.png';
import TamAva from '../assets/images/avatars/tam.png';
import CamAva from '../assets/images/avatars/cam.png';
import DigheAva from '../assets/images/avatars/dighe.png';


const StyledTabs = withStyles({
    root: {
        background: '#f6f6f6'
    },
    indicator: {
      backgroundColor: '#EEEEEE',
    },
})(Tabs);
  
const StyledTab = withStyles(() => ({
    root: {
        textTransform: 'none',
        color: '#2C2C2C',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: '.5px',
        '&:focus': {
        outline: 'none'
        }
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    post_container: {
        border: '.5px solid #EEEEEE',
        background: '#FFFFFF',
        borderRadius: 2,
        marginBottom: 10,
    },
    form_container: {
        position: 'relative',
        width: '100%'
    },
    p_16: {
        padding: 16
    },
    input_row_style: {
        position: 'relative',
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 0,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    iconButton: {
        color: '#9E9E9E',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        '&:focus': {
            outline: 'none',
        },
    },
    button: {
        color: '#FFFFFF',
        borderRadius: 4,
        minWidth: 140,
        boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
        '&$disabled': {
          boxShadow: 'none',
        },
        textTransform: 'none',
    },
    gc_button: {
        marginLeft: 10,
        marginRight: 10
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const coworkers = [
    {
        avatar: BongCaiAva,
        name: 'Bống Bống'
    },
    {
        avatar: TamAva,
        name: 'Tấm'
    },
    {
        avatar: DigheAva,
        name: 'Dì ghẻ'
    },
    {
        avatar: CamAva,
        name: 'Cám'
    }
];



function PostRecognition () {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [personName, setPersonName] = useState([]);
    const [trophies, setTrophies]= useState(0);
    const [selectedBadge, setSelectedBadge] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeName = (e) => {
        setPersonName(e.target.value)
    }

    // const canGivePoints = true;

     const badgeAttachability = true;

    const handleDelete = () => {
        alert("Deleted");
    }

    const getImageForBadgeIcon = () => {

        if (selectedBadge) {
          return getImageForBadge(selectedBadge, true);
        }
        
    };
    
    const getImageTitleForBadge = () => {

        if (selectedBadge) {
            return selectedBadge.displayName;
        }
        return 'Add Badge';
    };

    return (
        <div className={classes.post_container}>
            <div style={{overflow: 'hidden', width: 'calc(100% - 1px)'}}>
                <StyledTabs
                    centered
                    variant='fullWidth'
                    value={value}
                    onChange={handleChange}>
                    <StyledTab disableRipple label='Give Recognition' />
                </StyledTabs>
            </div>
            <form className={classes.form_container}>
                <div className={classes.p_16}>
                    <div 
                        className={classNames(
                            'row',
                            'shoutout-user-select',
                            classes.input_row_style,
                        )}
                    >
                        <div style={{width: '100%', display: 'flex', zIndex: '3', position: 'relative'}}>
                            <div style={{width: '50px', height: '31px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <div style={{color: '#9e9e9e', filter: 'grayscale(1)', cursor: 'pointer', fontSize: '16px'}}>
                                    <span role='img' aria-label='icon'>😎</span>
                                </div>
                            </div>
                            <div style={{width: '100%'}}>
                                <FormControl fullWidth>
                                <Select
                                // labelId="demo-mutiple-chip-label"
                                // id="demo-mutiple-chip"
                                    multiple
                                    value={personName}
                                    onChange={handleChangeName}
                                    input={<Input />}
                                    renderValue={(selected) => {
                                        return (
                                            <div className={classes.chips}>
                                                {selected.map((value) => (
                                                    <Chip 
                                                        avatar={
                                                            <Avatar alt='Natacha' src={value.avatar} />
                                                        }
                                                        key={value.name}
                                                        label={value.name}
                                                        className={classes.chip} 
                                                        onDelete={handleDelete}
                                                    />
                                                ))}
                                            </div>
                                        )
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    {coworkers.map((worker) => (
                                        <MenuItem key={worker.name} value={worker}>
                                            {worker.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(
                            'row',
                            'shoutout-user-select',
                            classes.input_row_style,
                        )}
                    >
                            <div style={{width: '100%', display: 'flex', zIndex: '3', position: 'relative'}}>
                                <div style={{width: '50px', height: '31px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <div style={{color: '#9e9e9e', filter: 'grayscale(1)', cursor: 'pointer', fontSize: '16px'}}>
                                        <span role='img' aria-label='icon'>🏆</span>
                                    </div>
                                </div>
                            <div style={{width: '100%'}}>
                                <FormControl fullWidth>
                                    <Select
                                        // value={trophies}
                                        // onChange={handleChangeTrophies}
                                        value=""
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        MenuProps={MenuProps}
                                    >
                                        {/* <MenuItem value="" disabled>
                                            <div style={{color: '#9e9e9e'}}>Add Trophies</div>
                                        </MenuItem> */}
                                        <MenuItem value="10"><span role='img' aria-label='icon'>🙂</span> Add 10 Trophies</MenuItem>
                                        <MenuItem value="20"><span role='img' aria-label='icon'>😀</span> Add 20 Trophies</MenuItem>
                                        <MenuItem value="30"><span role='img' aria-label='icon'>👏</span> Add 30 Trophies</MenuItem>
                                        <MenuItem value="40"><span role='img' aria-label='icon'>💪</span> Add 40 Trophies</MenuItem>
                                        <MenuItem value="50"><span role='img' aria-label='icon'>🚀</span> Add 50 Trophies</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(
                            'row',
                            'shoutout-user-select',
                            classes.input_row_style,
                        )}
                    >
                            <div style={{width: '100%', display: 'flex', zIndex: '3', position: 'relative'}}>
                                <div style={{width: '50px', height: '31px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <div style={{color: '#9e9e9e', filter: 'grayscale(1)', cursor: 'pointer', fontSize: '16px'}}>
                                        <span role="img" aria-label="icon">✍️</span>
                                    </div>
                                </div>
                            <div style={{width: '100%'}}>
                                <FormControl fullWidth>
                                    <TextField multiline placeholder="What did your cowokers(s) do?"/>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-content-end align-items-center" style={{display: 'flex', padding: 14}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        {/* {canGivePrivateMessage && (
                            <Tooltip title="Give Privately" placement="top">
                            <IconButton
                                className={classNames(classes.iconButton, {
                                [classes.iconButtonOn]: this.state.givePrivately,
                                })}
                                onClick={this.onGivePrivateClick}
                                aria-label="Give Privately"
                            >
                                <VisibilityIcon />
                            </IconButton>
                            </Tooltip>
                        )} */}
                        {
                            badgeAttachability && (
                                <Tooltip title='Add Badge' placement='top'>
                                    <IconButton className={classes.iconButton} aria-label='Add Badge'>
                                        {
                                            selectedBadge ? (
                                                <img
                                                    className='add-emoji-img'
                                                    alt='badges'
                                                    title={() => getImageTitleForBadge()}
                                                    src={() => getImageForBadgeIcon()} />
                                            ) : (
                                            <AdjustIcon /> )
                                        }
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        <Tooltip title="Add Emoji" placement="top">
                            <IconButton
                                className={classes.iconButton}
                                // onClick={onEmojiClick}
                                aria-label="Add Emoji"
                            >
                                <EmojiIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Image" placement="top">
                            <IconButton
                                color="primary"
                                className={classes.iconButton}
                                component="span"
                                aria-label="Add Image"
                            >
                                <CameraIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Gif" placement="top">
                            <IconButton
                                // onClick={onGifClick}
                                className={classes.iconButton}
                                aria-label="Add Gif"
                            >
                                <GifIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.gc_button}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                        // disabled={giveButtonDisabled}
                        disabled
                    >
                        {
                        /* {givePrivately
                        ? 'Give Privately'
                        : titleize(GIVE_RECOGNITION)} */
                        
                        titleize('give recognition')}
                    </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PostRecognition