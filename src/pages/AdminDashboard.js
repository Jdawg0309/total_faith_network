import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUpload, FiEdit, FiTrash2, FiSearch, FiX, FiUser, FiLogOut, FiPlus, FiMinus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  // State management
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/admin/login');  // Redirect if no token
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    channel: '',
    category_id: '',
    duration: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newCategory, setNewCategory] = useState('');
  const videosPerPage = 10;

  // Fetch videos and categories
  const fetchVideos = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/videos?page=${currentPage}&limit=${videosPerPage}&search=${searchTerm}`
      );
      if (!res.ok) throw new Error('Failed to fetch videos');
      const { videos, totalPages } = await res.json();
      setVideos(videos);
      setTotalPages(totalPages);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm]);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, [fetchVideos, fetchCategories]);

  // Handle video preview
  useEffect(() => {
    if (!videoFile) return;
    const objectUrl = URL.createObjectURL(videoFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [videoFile]);

  // Input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setFile) => {
    if (!e.target.files || !e.target.files[0]) return;
    setFile(e.target.files[0]);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!videoFile) {
      toast.error('Please select a video file');
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    data.append('video', videoFile);
    if (avatarFile) data.append('avatar', avatarFile);

    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        body: data
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Upload failed');

      toast.success('Video uploaded successfully!');
      resetForm();
      fetchVideos();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(formData)
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Update failed');

      toast.success('Video updated successfully!');
      resetForm();
      fetchVideos();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Video management
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      
      if (!res.ok) throw new Error('Delete failed');
      
      toast.info('Video deleted successfully');
      fetchVideos();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (video) => {
    setEditingId(video.id);
    setFormData({
      title: video.title,
      description: video.description,
      channel: video.channel,
      category_id: video.category_id,
      duration: video.duration
    });
  };

  // Helper functions
  const resetForm = () => {
    setFormData({ title: '', description: '', channel: '', category_id: '', duration: '' });
    setVideoFile(null);
    setAvatarFile(null);
    setEditingId(null);
    setPreviewUrl('');
  };

  const getAuthToken = () => {
    return localStorage.getItem('authToken') || 'secure-auth-token';
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  const createCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await fetch(`${API_BASE_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ name: newCategory })
      });
      setNewCategory('');
      fetchCategories();
      toast.success('Category added!');
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      fetchCategories();
      toast.info('Category deleted');
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  // Render functions
  const renderVideoList = () => {
    if (isLoading) return <LoadingSpinner />;
    
    if (videos.length === 0) {
      return <EmptyState>No videos found. Upload your first video!</EmptyState>;
    }

    return (
      <>
        <VideoGrid>
          {videos.map(video => (
            <VideoCard key={video.id}>
              <ThumbnailContainer>
                {video.avatar_url ? (
                  <Thumbnail src={`${API_BASE_URL}${video.avatar_url}`} alt={video.title} />
                ) : (
                  <PlaceholderThumbnail />
                )}
                <DurationBadge>{video.duration || '0:00'}</DurationBadge>
              </ThumbnailContainer>
              <VideoInfo>
                <VideoTitle>{video.title}</VideoTitle>
                <Channel>{video.channel}</Channel>
                <Description>{video.description.substring(0, 100)}...</Description>
                <CategoryBadge>{video.category_name || 'Uncategorized'}</CategoryBadge>
                <ViewsCount>{video.views || 0} views</ViewsCount>
              </VideoInfo>
              <ActionButtons>
                <EditButton onClick={() => handleEdit(video)}>
                  <FiEdit size={16} />
                </EditButton>
                <DeleteButton onClick={() => handleDelete(video.id)}>
                  <FiTrash2 size={16} />
                </DeleteButton>
              </ActionButtons>
            </VideoCard>
          ))}
        </VideoGrid>
        
        <Pagination>
          <PaginationButton 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Previous
          </PaginationButton>
          
          <PageInfo>Page {currentPage} of {totalPages}</PageInfo>
          
          <PaginationButton 
            disabled={currentPage >= totalPages} 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Next
          </PaginationButton>
        </Pagination>
      </>
    );
  };

  return (
    <DashboardContainer>
      <ToastContainer position="bottom-right" autoClose={3000} />
      
      <DashboardHeader>
        <HeaderLeft>
          <Logo>TFN Studio</Logo>
          <NavLinks>
            <NavLink active>Dashboard</NavLink>
            <NavLink>Analytics</NavLink>
          </NavLinks>
        </HeaderLeft>
        
        <HeaderRight>
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="Search videos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? (
              <ClearButton onClick={() => setSearchTerm('')}>
                <FiX size={18} />
              </ClearButton>
            ) : (
              <SearchIcon>
                <FiSearch size={18} />
              </SearchIcon>
            )}
          </SearchContainer>
          
          <UserMenu>
            <UserAvatar>
              <FiUser size={20} />
            </UserAvatar>
            <UserDropdown>
              <DropdownItem onClick={handleLogout}>
                <FiLogOut size={16} />
                Logout
              </DropdownItem>
            </UserDropdown>
          </UserMenu>
        </HeaderRight>
      </DashboardHeader>

      <DashboardContent>
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Content</SidebarTitle>
            <SidebarLink active><span>Videos</span> <CountBadge>{Array.isArray(videos) ? videos.length : 0}</CountBadge></SidebarLink>
            <SidebarLink><span>Playlists</span></SidebarLink>
            <SidebarLink><span>Shorts</span></SidebarLink>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Analytics</SidebarTitle>
            <SidebarLink><span>Overview</span></SidebarLink>
            <SidebarLink><span>Audience</span></SidebarLink>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Settings</SidebarTitle>
            <SidebarLink><span>Channel</span></SidebarLink>
            <SidebarLink><span>Permissions</span></SidebarLink>
          </SidebarSection>
        </Sidebar>
        
        <MainContent>
          <ContentHeader>
            <h1>{editingId ? 'Edit Video' : 'Upload New Video'}</h1>
            <HelpLink>Help & resources</HelpLink>
          </ContentHeader>
          
          <FormContainer>
            <StyledForm onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(); } : handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>Video Title *</Label>
                  <Input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Duration (mm:ss) *</Label>
                  <Input 
                    type="text" 
                    name="duration" 
                    placeholder="5:30"
                    value={formData.duration} 
                    onChange={handleChange} 
                    required 
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label>Channel *</Label>
                  <Input 
                    type="text" 
                    name="channel" 
                    value={formData.channel} 
                    onChange={handleChange} 
                    required 
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Category *</Label>
                  <Select 
                    name="category_id" 
                    value={formData.category_id} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label>Description</Label>
                <Textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows="4" 
                />
              </FormGroup>
              
              {!editingId && (
                <>
                  <FormRow>
                    <FormGroup>
                      <Label>Video File *</Label>
                      <FileUpload>
                        <FileInput 
                          type="file" 
                          accept="video/mp4,video/webm" 
                          onChange={(e) => handleFileChange(e, setVideoFile)}
                          required
                        />
                        <UploadLabel>
                          {videoFile ? videoFile.name : 'Choose video file...'}
                        </UploadLabel>
                        <UploadIcon>
                          <FiUpload size={18} />
                        </UploadIcon>
                      </FileUpload>
                      <FileHint>MP4 or WebM, max 10GB</FileHint>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Thumbnail</Label>
                      <FileUpload>
                        <FileInput 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileChange(e, setAvatarFile)}
                        />
                        <UploadLabel>
                          {avatarFile ? avatarFile.name : 'Choose thumbnail...'}
                        </UploadLabel>
                        <UploadIcon>
                          <FiUpload size={18} />
                        </UploadIcon>
                      </FileUpload>
                      <FileHint>JPG, PNG or GIF</FileHint>
                    </FormGroup>
                  </FormRow>
                  
                  {previewUrl && (
                    <PreviewContainer>
                      <Label>Video Preview</Label>
                      <VideoPreview controls>
                        <source src={previewUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </VideoPreview>
                    </PreviewContainer>
                  )}
                </>
              )}
              
              <FormActions>
                {editingId && (
                  <CancelButton type="button" onClick={resetForm}>
                    Cancel
                  </CancelButton>
                )}
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Spinner />
                  ) : editingId ? (
                    'Update Video'
                  ) : (
                    'Upload Video'
                  )}
                </SubmitButton>
              </FormActions>
            </StyledForm>
          </FormContainer>
          
          <SectionDivider />
          
          <ContentHeader>
            <h1>Your Videos</h1>
            <SortSelect>
              <option>Newest first</option>
              <option>Most popular</option>
              <option>Alphabetical</option>
            </SortSelect>
          </ContentHeader>
          
          {renderVideoList()}

          <SectionDivider />

          <ContentHeader>
            <h1>Manage Categories</h1>
          </ContentHeader>
          
          <CategoryManager>
            <CategoryForm>
              <CategoryInput
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name"
              />
              <AddButton onClick={createCategory}>
                <FiPlus size={16} />
                Add
              </AddButton>
            </CategoryForm>
            
            <CategoryList>
              {categories.map((cat) => (
                <CategoryItem key={cat.id}>
                  <CategoryName>{cat.name}</CategoryName>
                  <DeleteCategoryButton onClick={() => deleteCategory(cat.id)}>
                    <FiMinus size={14} />
                  </DeleteCategoryButton>
                </CategoryItem>
              ))}
            </CategoryList>
          </CategoryManager>
        </MainContent>
      </DashboardContent>
    </DashboardContainer>
  );
};

// Styled Components
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #0f0f0f;
  color: #f1f1f1;
  font-family: 'Roboto', sans-serif;
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  background-color: #202020;
  border-bottom: 1px solid #303030;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ff0000;
  letter-spacing: -0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const NavLink = styled.a`
  font-size: 14px;
  font-weight: ${props => props.active ? '500' : '400'};
  color: ${props => props.active ? '#fff' : '#aaa'};
  padding: 6px 0;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: #ff0000;
    transition: width 0.3s;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 360px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 16px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 24px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
    background: #181818;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  
  &:hover {
    color: #fff;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3da6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 200px;
  background: #202020;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  overflow: hidden;
  display: none;
  
  ${UserMenu}:hover & {
    display: block;
    animation: ${fadeIn} 0.2s ease;
  }
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  
  &:hover {
    background: #303030;
  }
`;

const DashboardContent = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 240px;
  background: #202020;
  padding: 24px 0;
  border-right: 1px solid #303030;
  overflow-y: auto;
`;

const SidebarSection = styled.div`
  margin-bottom: 24px;
`;

const SidebarTitle = styled.h3`
  padding: 0 24px 8px;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  color: #aaa;
`;

const SidebarLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  font-size: 14px;
  color: ${props => props.active ? '#fff' : '#aaa'};
  background: ${props => props.active ? '#303030' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    background: #303030;
  }
  
  span {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const CountBadge = styled.span`
  background: #ff0000;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  h1 {
    font-size: 24px;
    font-weight: 500;
  }
`;

const HelpLink = styled.a`
  color: #3da6ff;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FormContainer = styled.div`
  background: #202020;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #f1f1f1;
`;

const Input = styled.input`
  padding: 12px 14px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
  }
`;

const Select = styled.select`
  padding: 12px 14px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
  }
`;

const Textarea = styled.textarea`
  padding: 12px 14px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
  }
`;

const FileUpload = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  overflow: hidden;
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const UploadLabel = styled.div`
  flex: 1;
  padding: 12px 14px;
  font-size: 14px;
  color: ${props => props.empty ? '#777' : '#fff'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UploadIcon = styled.div`
  padding: 0 14px;
  color: #aaa;
`;

const FileHint = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 4px;
`;

const PreviewContainer = styled.div`
  margin-top: 10px;
`;

const VideoPreview = styled.video`
  width: 100%;
  max-height: 300px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: #ff0000;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 150px;
  
  &:hover {
    background: #cc0000;
  }
  
  &:disabled {
    background: #606060;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  background: transparent;
  color: #aaa;
  border: 1px solid #303030;
  border-radius: 24px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #303030;
    color: #fff;
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background: #303030;
  margin: 32px 0;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  background: #202020;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const VideoCard = styled.div`
  background: #202020;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff0000, #ff6b00);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.2);
  font-size: 48px;
  font-weight: bold;
`;

const DurationBadge = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const VideoInfo = styled.div`
  padding: 16px;
`;

const VideoTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Channel = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #aaa;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background: rgba(255,0,0,0.1);
  color: #ff0000;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const ViewsCount = styled.div`
  font-size: 12px;
  color: #777;
`;

const ActionButtons = styled.div`
  display: flex;
  border-top: 1px solid #303030;
`;

const EditButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: transparent;
  color: #aaa;
  border: none;
  border-right: 1px solid #303030;
  cursor: pointer;
  
  &:hover {
    background: #303030;
    color: #fff;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: transparent;
  color: #aaa;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #303030;
    color: #ff4d4d;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #202020;
  border-radius: 12px;
  text-align: center;
  color: #777;
  margin-bottom: 32px;
`;

const LoadingSpinner = styled(Spinner)`
  margin: 40px auto;
  width: 40px;
  height: 40px;
  border-width: 3px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background: #303030;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: #404040;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: #aaa;
  font-size: 14px;
`;

// Category Management Styles
const CategoryManager = styled.div`
  background: #202020;
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;
`;

const CategoryForm = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const CategoryInput = styled.input`
  flex: 1;
  padding: 12px 14px;
  background: #121212;
  border: 1px solid #303030;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3da6ff;
  }
`;

const AddButton = styled.button`
  padding: 12px 20px;
  background: #3da6ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    background: #2b8fd8;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const CategoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #2a2a3a;
  border-radius: 8px;
`;

const CategoryName = styled.span`
  font-size: 14px;
`;

const DeleteCategoryButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 50, 50, 0.1);
  color: #ff3232;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 50, 50, 0.2);
  }
`;

export default AdminDashboard;