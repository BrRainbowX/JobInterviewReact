import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import store from 'store';
import FileSaver  from 'file-saver'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import ReactAvatarEditor from 'react-avatar-editor'
import InputAdornment from '@material-ui/core/InputAdornment';
import StorageIcon from '@material-ui/icons/Storage';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newDatabase: null,
            shouldImportOne: false,
            shouldImportMoreThanOne: false,
        }

        this.inputReference = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handleDeleteThis = this.handleDeleteThis.bind(this);
        this.handleDatabaseChange = this.handleDatabaseChange.bind(this);
        // Download
        this.handleDownloadAllDatabases = this.handleDownloadAllDatabases.bind(this);
        this.handleDownloadThisDatabase = this.handleDownloadThisDatabase.bind(this);
        // Import
        this.handleImportAllDatabases = this.handleImportAllDatabases.bind(this);
        this.handleImportJustOneDatabase = this.handleImportJustOneDatabase.bind(this);
    }

    handleChange(event) {
        this.setState({newDatabase: event.target.value});
    }

    handleSubmit(event) {
        if(
            this.state.newDatabase === null ||
            this.state.newDatabase.length === 0) return alert('Type something!');
        this.props.createNewDatabase(this.state.newDatabase);
        this.setState({newDatabase: null});
        event.preventDefault();
    }

    handleDeleteAll(event) {
        this.setState({newDatabase: 'New Database'});
        this.props.deleteAllDatabases();
        event.preventDefault();
    }

    handleDeleteThis(event) {
        //this.setState({newDatabase: 'New Database'});
        this.props.deleteThisDatabase();
        event.preventDefault();
    }

    handleDatabaseChange(event) {
        this.props.changeDatabase(event.value);
    }

    handleDownloadAllDatabases(event) {
        this.props.downloadAllDatabases();
        event.preventDefault();
    }

    handleDownloadThisDatabase(event) {
        this.props.downloadThisDatabase();
        event.preventDefault();
    }

    //
    // Import all database
    //
    fileUploadAction = () => this.inputReference.current.click();

    async handleImportAllDatabases() {
        this.setState({shouldImportMoreThanOne: true, shouldImportOne: false});
        this.fileUploadAction();
    }

    handleImportJustOneDatabase() {
        this.setState({shouldImportMoreThanOne: false, shouldImportOne: true});
        this.fileUploadAction();
    }

    fileUploadInputChange = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file)
        reader.onloadend = () => {
            const res = reader.result.replace('data:text/json;charset=utf-8,',' ')
            const data = JSON.parse(res);
            if(this.state.shouldImportMoreThanOne) {
                this.props.importAllDatabases(data);
            }
            if(this.state.shouldImportOne) {
                this.props.importJustOneDatabase(data);
            }
        };
        e.preventDefault();
    };


    render() {
        const items = [];
        let select;
        if(this.props.database.length > 0) {
            for (const [index, value] of this.props.database.entries()) {
                const data = {
                    "value": index,
                    "label": value.database_name,
                }
                items.push(data);
            }
            select = <Select options={items} value={items[this.props.selectedDatabase]} onChange={(i) => this.handleDatabaseChange(i)} />
        }else {
            select = <p>You need to create your image database!</p>;
        }
        return(
            <div className="content-grid--item left-sidebar"> 
                <div className="left-sidebar--title">
                    <h1>MVISIA</h1>
                </div>
                <div>
                    <h3>Select your DB below</h3>
                   {select}
                </div>
                <div>
                    <h3>Create your DB below</h3>
                    <TextField 
                        variant="outlined"
                        onChange={this.handleChange}
                        placeholder="Database Name"
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <StorageIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button 
                        variant="contained"
                        onClick={this.handleSubmit}
                        style={{
                            backgroundColor: "#00579d"
                        }}
                        disableElevation
                        size="large"
                        fullWidth
                        startIcon={<AddIcon />}
                        >
                        Create DB
                    </Button>    
                </div>
                <div>
                    <h3>Manage</h3>
                    <h5>Delete</h5>
                    <Button 
                        variant="contained"
                        onClick={this.handleDeleteThis}
                        color="secondary"
                        disableElevation
                        size="small"
                        startIcon={<DeleteIcon />}
                        fullWidth
                        >
                        DELETE THIS DB
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={this.handleDeleteAll}
                        color="secondary"
                        disableElevation
                        size="small"
                        startIcon={<DeleteIcon />}
                        fullWidth
                        >
                        DELETE ALL DB's
                    </Button>
                    <h5>Backup</h5>
                    <Button 
                        variant="contained"
                        onClick={this.handleDownloadThisDatabase}
                        style={{
                            backgroundColor: "#00579d"
                        }}
                        disableElevation
                        size="small"
                        startIcon={<CloudDownloadIcon />}
                        fullWidth
                        >
                        DOWNLOAD THIS DB
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={this.handleDownloadAllDatabases}
                        style={{
                            color: "#00579d"
                        }}
                        disableElevation
                        size="small"
                        startIcon={<CloudDownloadIcon />}
                        fullWidth
                        >
                        DOWNLOAD ALL DB
                    </Button>
                    <h5>Restore</h5>
                    <input type="file" hidden ref={this.inputReference} onChange={this.fileUploadInputChange.bind(this)} />
                    <Button 
                        variant="contained"
                        onClick={this.handleImportJustOneDatabase}
                        color="secondary"
                        disableElevation
                        size="small"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        >
                        RESTORE ONE DB
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={this.handleImportAllDatabases}
                        color="secondary"
                        disableElevation
                        size="small"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        >
                        RESTORE FULL DB
                    </Button>
                </div>
            </div>
        );
    };
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            allowZoomOut: false,
            position: { x: 0.5, y: 0.5 },
            scale: 1,
            rotate: 0,
            borderRadius: 0,
            preview: null,
            width: 500,
            height: 300,
            img: null,
        }
        this.handleDownloadAllPhotos = this.handleDownloadAllPhotos.bind(this);
        this.inputReference = React.createRef();
    }

    fileUploadAction = () => {
        this.inputReference.current.click();
    };

    fileUploadInputChange = (e) => {
        var files = e.target.files;
        Array.from(files).forEach(file => { 
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.props.addPhoto(reader.result)
            };
        });
    };
      
    handleScale = e => {
        this.setState({ scale: e })
    }

    handlePositionChange = position => {
        this.setState({ position })
    }

    onClickSave = () => {
        if(this.state.scale === 1) alert('To crop: first zoom in it!')
        if (this.editor) {
            const canvas = this.editor.getImage()
            this.setState({image: canvas.toDataURL()});
            this.setState({scale: 1});
            this.props.cropThisImage(canvas.toDataURL());
        }
    }

    setEditorRef = (editor) => this.editor = editor;

    handleDownloadAllPhotos() {
        const photos = this.props.database[this.props.selectedDatabase].photos;
        photos.forEach((e, index)=> {
            FileSaver.saveAs(e.photo, (index+1) + '.PNG')
        });
    }

    render() {
        let photo;
        if(this.props.database.length === 0) {
            return(
                <div className="content-grid--item main">
                    <AlertBlock message={"Create your database first!"} />
                </div>
            );
        }
        if(
            this.props.database.length > 0 &&
            this.props.database[this.props.selectedDatabase].photos.length > 0 &&
            this.props.database[this.props.selectedDatabase].photos[this.props.selectedImage].photo !== null
            ) {
            photo = this.props.database[this.props.selectedDatabase].photos[this.props.selectedImage].photo;
            if(this.state.image == null || this.state.image !== photo) {
                this.setState({image: photo, scale: 1});
            }
        }else {
            if(this.state.image != null)
                this.setState({image: null});
        }
        return(
            <div className="content-grid--item main"> 
                <div className="main--header">
                    <Button 
                        variant="contained"
                        onClick={this.fileUploadAction}
                        style={{
                        backgroundColor: "#00579d"
                    }}
                        disableElevation
                        size="large"
                        startIcon={<CloudUploadIcon />}
                        >
                        UPLOAD IMAGE
                    </Button>
                </div>
                <input type="file" multiple hidden ref={this.inputReference} onChange={this.fileUploadInputChange.bind(this)} />
                <div className="main--photo-info">
                    <p>You can upload more than one image at time!</p>
                </div>
                <div className="main--photo">
                    <ReactAvatarEditor
                        ref={this.setEditorRef}
                        scale={parseFloat(this.state.scale)}
                        width={this.state.width}
                        height={this.state.height}
                        position={this.state.position}
                        onPositionChange={this.handlePositionChange}
                        rotate={parseFloat(this.state.rotate)}
                        borderRadius={this.state.width / (100 / this.state.borderRadius)}
                        image={this.state.image}
                        className="editor-canvas"
                    />
                </div>
                <div className="main--photo-info">
                    <p>You can drag the photo after applying zoom!</p>
                </div>
                <div className="main--slide">
                    <div className="main--slide-info">
                        <p>Zoom:</p>
                    </div>
                    <ContinuousSlider
                        parentValue={this.state.scale}
                        setScale={this.handleScale}
                    />
                </div>
                
                <div className="main--button">
                    <Button 
                        variant="contained"
                        onClick={this.onClickSave}
                        style={{
                            backgroundColor: "#00579d"
                        }}
                        disableElevation
                        size="medium"
                        startIcon={<SaveIcon />}
                        >
                        CROP & SAVE
                        </Button>
                    <Button 
                        variant="outlined"
                        onClick={()=> FileSaver.saveAs(this.state.image, 'DOWNLOAD.PNG')}
                        style={{
                            color: "#00579d",
                            borderColor: "#00579d"
                        }}
                        disableElevation
                        size="medium"
                        startIcon={<CloudDownloadIcon />}
                        >
                        DOWNLOAD
                        </Button>
                    <Button 
                        variant="outlined"
                        onClick={this.handleDownloadAllPhotos}
                        style={{
                            color: "#222222",
                            borderColor: "#222222"
                        }}
                        disableElevation
                        size="medium"
                        startIcon={<CloudDownloadIcon />}
                        >
                        DOWNLOAD ALL IMAGES
                        </Button>
                </div>
            </div>
        );
    };
}

const AlertBlock = (props) => {
    return(
        <div className="alert-block">
            <h4>{props.message}</h4>
        </div>
    );
}

export default AlertBlock;

class ContinuousSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.parentValue
        }
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue})
        this.props.setScale(newValue);
    };
  
    render() {
        if(this.props.parentValue !== this.state.value)
            this.setState({value: this.props.parentValue})
        return (
            <div>
              <Slider 
                value={this.state.value}
                style={{
                    color: "#00579d"
                }}
                onChange={this.handleChange}
                min={1}
                max={5}
                step={0.01}
                aria-labelledby="continuous-slider" />
            </div>
          );
    }
  }

class RightSidebar extends React.Component {

    handleDelete(index) {
        this.props.deleteThisPhoto(index);
    }

    handleSelectPhoto(index) {
        this.props.selectThisPhoto(index);
    }

    render() {
        let items = [];
        if(this.props.database.length > 0 && this.props.database[this.props.selectedDatabase].photos.length > 0) {
            for (const [index, value] of this.props.database[this.props.selectedDatabase].photos.entries()) {
                const url = value.photo.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
                const imageName = this.props.database[this.props.selectedDatabase].database_name + '_' + index + '.png';
                items.push(
                    <div key={index} className="right-sidebar--items">
                        <div>
                            <img src={value.photo} alt={index} width="100%" />
                        </div>
                        <div className="right-sidebar--items__buttons">
                            <IconButton aria-label="delete" onClick={()=> this.handleDelete(index)}>
                                <DeleteIcon 
                                style={{
                                    color: "#00579d"
                                }}
                                />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={()=> FileSaver.saveAs(url, imageName)}>
                                <CloudDownloadIcon  
                                style={{
                                    color: "#00579d"
                                }}
                                />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={()=> this.handleSelectPhoto(index)}>
                                <AspectRatioIcon 
                                style={{
                                    color: "#00579d"
                                }}
                                />
                            </IconButton>
                        </div>
                    </div>
                );
            }              
        }else {
            return(
                <div className="content-grid--item right-sidebar">
                    <div key={0} className="right-sidebar--items">
                        <AlertBlock message={"Uploaded images will appear here!"} />
                    </div>
                </div>  
            );
        }
        return(
            <div className="content-grid--item right-sidebar">
                {items}
            </div>  
        );
    }
}

class Web extends React.Component {
    constructor(props) {
        super(props);
        let data;
        data = store.get('database');
        if(data === undefined || data.length === 0)
            data = [];
        this.state = {
            database: data,
            selectedDatabase: 0,
            selectedImage: 0,
        }
    }

    newDatabase(data) {
        const index = this.state.database.length;
        const newDatabase = {
            "database_name": data,
            "photos": []
        }
        this.state.database.push(newDatabase);
        this.setState({selectedDatabase: index})
        store.set('database', this.state.database);
    }

    deleteAllDatabase() {
        this.setState({database: [], selectedDatabase: 0, selectedImage: 0});
        store.clearAll();
    }

    deleteThisDatabase() {
        const fullDatabase = this.state.database;
        let newIndex = this.state.selectedDatabase - 1;
        if(newIndex < 0) newIndex = 0;
        fullDatabase.splice(this.state.selectedDatabase, 1);
        this.setState({selectedDatabase: newIndex});
        this.setState({database: fullDatabase});
        store.set('database', this.state.database);
    }
    
    downloadAllDatabases() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.database));
        FileSaver.saveAs(dataStr, 'FULLBACKUP.json');
    }

    downloadThisDatabase() {
        const database = this.state.database[this.state.selectedDatabase];
        const name = this.state.database[this.state.selectedDatabase].database_name + '.json';
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(database));
        FileSaver.saveAs(dataStr, name);
    }

    importAllDatabases(json) {
        if(json.length === 0) return;
        this.setState({database: json, selectedDatabase: 0, selectedImage: 0});
        store.set('database', this.state.database);
    }

    importJustOneDatabase(json) {
        const index = this.state.database.length;
        const fullDatabase = this.state.database;
        fullDatabase.push(json);
        this.setState({database: fullDatabase, selectedDatabase: index, selectedImage: 0});
        store.set('database', this.state.database);
    }

    changeDatabase(data) {
        this.setState({selectedDatabase: data});
    }

    addPhoto(data) {
        const fullDatabase = this.state.database;
        const database = this.state.database[this.state.selectedDatabase];
        database.photos.push({
            "photo": data
        });
        fullDatabase[this.selectedDatabase] = database;
        this.setState({database: fullDatabase});
        store.set('database', this.state.database);
    }

    selectThisPhoto(photoIndex) {
        if(photoIndex < 0) this.setState({selectedImage: 0});
        this.setState({selectedImage: photoIndex});
    }

    deleteThisPhoto(photoIndex) {
        const index = this.state.selectedDatabase;
        const fullDatabase = this.state.database;
        const photos = this.state.database[index].photos;
        photos.splice(photoIndex, 1);
        fullDatabase[index].photos = photos;
        this.setState({database: fullDatabase});
        store.set('database', this.state.database);
    }

    cropThisImage(newImage) {
        const index = this.state.selectedDatabase;
        const photoIndex = this.state.selectedImage;
        const data = {
            "photo": newImage
        };
        const fullDatabase = this.state.database;
        const photos = this.state.database[index].photos;
        photos.splice(photoIndex, 1, data);
        fullDatabase[index].photos = photos;
        this.setState({database: fullDatabase});
        store.set('database', this.state.database);
    }

    render() {
        return(
            <div className="content-grid">
                <Sidebar 
                    database={this.state.database} 
                    selectedDatabase={this.state.selectedDatabase}
                    createNewDatabase={(data) => this.newDatabase(data)} 
                    deleteAllDatabases={() => this.deleteAllDatabase()} 
                    deleteThisDatabase={() => this.deleteThisDatabase()} 
                    changeDatabase={(data) => this.changeDatabase(data)}
                    downloadAllDatabases={() => this.downloadAllDatabases()}
                    downloadThisDatabase={() => this.downloadThisDatabase()}
                    importAllDatabases={(data) => this.importAllDatabases(data)}
                    importJustOneDatabase={(data)=> this.importJustOneDatabase(data)}
                    />
                <Main 
                    database={this.state.database} 
                    selectedImage={this.state.selectedImage}
                    selectedDatabase={this.state.selectedDatabase}
                    cropThisImage={(data)=> this.cropThisImage(data)}
                    addPhoto={(data)=> this.addPhoto(data)}
                    />
                <RightSidebar 
                    database={this.state.database} 
                    deleteThisPhoto={(index)=> this.deleteThisPhoto(index)}
                    selectThisPhoto={(index)=> this.selectThisPhoto(index)}
                    selectedImage={this.state.selectedImage}
                    selectedDatabase={this.state.selectedDatabase}
                />  
            </div>
        );
    };
}

ReactDOM.render(<Web />, document.getElementById("root"));