document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');
  const submitSpinner = document.getElementById('submitSpinner');
  const formResponse = document.getElementById('formResponse');
  
  // Form fields
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');
  
  // Error elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  
  // Validation functions
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function showError(field, errorElement, message) {
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  function clearError(field, errorElement) {
    field.classList.remove('error');
    errorElement.style.display = 'none';
  }
  
  // Input validation event listeners
  nameField.addEventListener('blur', function() {
    if (this.value.trim() === '') {
      showError(this, nameError, 'Name is required');
    } else {
      clearError(this, nameError);
    }
  });
  
  emailField.addEventListener('blur', function() {
    if (this.value.trim() === '') {
      showError(this, emailError, 'Email is required');
    } else if (!validateEmail(this.value)) {
      showError(this, emailError, 'Please enter a valid email address');
    } else {
      clearError(this, emailError);
    }
  });
  
  messageField.addEventListener('blur', function() {
    if (this.value.trim() === '') {
      showError(this, messageError, 'Message is required');
    } else {
      clearError(this, messageError);
    }
  });
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    // Pre-submission validation
    let hasErrors = false;
    
    if (nameField.value.trim() === '') {
      showError(nameField, nameError, 'Name is required');
      hasErrors = true;
    }
    
    if (emailField.value.trim() === '') {
      showError(emailField, emailError, 'Email is required');
      hasErrors = true;
    } else if (!validateEmail(emailField.value)) {
      showError(emailField, emailError, 'Please enter a valid email address');
      hasErrors = true;
    }
    
    if (messageField.value.trim() === '') {
      showError(messageField, messageError, 'Message is required');
      hasErrors = true;
    }
    
    if (hasErrors) {
      e.preventDefault();
      return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitSpinner.style.display = 'inline-block';
    
    // FormSubmit will handle the actual submission
    // We don't prevent the default form submission
  });
});
