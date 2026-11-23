
.question-section {
  margin-top: 45px;
  padding: 30px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.answer-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 25px 0;
}

.answer-option {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  color: #334155;
  font-size: 13px;
  line-height: 1.7;
  cursor: pointer;
}

.answer-option.selected {
  border-color: #087e8b;
  background: #f0fdfa;
}

.answer-option input {
  margin-top: 5px;
  accent-color: #087e8b;
}

.option-letter {
  font-weight: 700;
  color: #087e8b;
  min-width: 18px;
}

.primary-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.answer-feedback {
  margin-top: 25px;
}
