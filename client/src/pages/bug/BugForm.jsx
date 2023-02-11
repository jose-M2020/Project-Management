
const BugForm = () => {
  return (
    {/* <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({setFieldValue}) => (
          <Form>
            <Typography variant='h3'>Project</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: [3],
                maxWidth: '550px',
                marginX: 'auto',
                marginBottom: '10px'
              }}
            >
              <Input label="Name*" name="name" />
              <Input label="Description*" name="description" multiline rows={4} />
              <Input label="Type" name="type" />
              {!loading && (
                <>
                  <AutoComplete label="Client" 
                              name="clientID" 
                              options={clientsOptions}
                  />
                  <AutoComplete label="Team" 
                              name="team" 
                              options={devsOptions}
                              multiple
                  />
                </>
              )}
              <AutoComplete label="Tags" 
                            name="tags" 
                            options={tagsOptions} 
                            multiple
                            freeSolo
                />
              <Input label="Repository" name="repository" 
                     icon={<LanguageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} 
                     variant="standard"     
              />
              <Input label="URL" name="url" 
                     icon={<LanguageIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />} 
                     variant="standard"     
              />              
              <CustomButton text='Create project' type="submit" />
            </Box>
          </Form>
        )}
      </Formik> */}
  )
}

export default BugForm